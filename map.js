// G-Pass 핵심 정류장 (울산역, 시티투어, 태화강 관련)
const KEY_STATIONS = [
  { name: 'KTX울산역(3000, 3100)', lat: 35.55064862, lng: 129.1388408, id: '15413', type: 'ktx' },
  { name: '울산역(시내 방면)', lat: 35.55161809, lng: 129.1389054, id: '15414', type: 'ktx' },
  { name: '울산역(언양 방면)', lat: 35.55172615, lng: 129.1389094, id: '15429', type: 'ktx' },
  { name: '울산역(종점)', lat: 35.55119682, lng: 129.1388802, id: '15415', type: 'ktx' },
  { name: '울산역(343 삼남방면)', lat: 35.55167461, lng: 129.1389122, id: '15419', type: 'ktx' },
  { name: '시티버스-태화강국가정원(오산광장)', lat: 35.5496894, lng: 129.2921248, id: '90008', type: 'citytour' },
  { name: '시티버스-태화강국가정원(회전교차로)', lat: 35.55058213, lng: 129.2991847, id: '90009', type: 'citytour' },
  { name: '시티버스-태화강전망대(태화강 동굴피아)', lat: 35.54451058, lng: 129.2934244, id: '90006', type: 'citytour' },
  { name: '시티버스-태화강역', lat: 35.53830275, lng: 129.3527577, id: '90000', type: 'citytour' },
  { name: '시티버스-태화루', lat: 35.55396977, lng: 129.3069833, id: '90010', type: 'citytour' },
  { name: '시티버스-태화교정류장', lat: 35.54959959, lng: 129.3073377, id: '90005', type: 'citytour' },
  { name: '시티버스-삼호대숲(철새홍보관)', lat: 35.55094209, lng: 129.2780942, id: '90007', type: 'citytour' },
  { name: '시티버스-롯데광장', lat: 35.53850294, lng: 129.3393616, id: '90002', type: 'citytour' },
  { name: '시티버스-롯데시티호텔', lat: 35.53767622, lng: 129.3297082, id: '90003', type: 'citytour' },
  { name: '시티버스-스타즈호텔', lat: 35.53999028, lng: 129.34721, id: '90001', type: 'citytour' },
  { name: '시티버스-현대백화점', lat: 35.54060365, lng: 129.3355807, id: '90004', type: 'citytour' },
  { name: '시티버스-문화예술회관', lat: 35.5431855, lng: 129.3253116, id: '90013', type: 'citytour' },
  { name: '시티버스-고래박물관', lat: 35.50339988, lng: 129.3805682, id: '90016', type: 'citytour' },
  { name: '시티버스-대왕암공원', lat: 35.49012699, lng: 129.4359733, id: '90018', type: 'citytour' },
  { name: '시티버스-시계탑사거리(울산시립미술관)', lat: 35.55520345, lng: 129.3214523, id: '90011', type: 'citytour' },
  { name: '시티버스-중앙전통시장', lat: 35.55426224, lng: 129.3236524, id: '90012', type: 'citytour' },
  { name: '태화강국가정원 동강병원', lat: 35.55253514, lng: 129.3007721, id: '21210', type: 'taehwa' },
  { name: '태화강국가정원 로터리', lat: 35.5510717, lng: 129.2997953, id: '21214', type: 'taehwa' },
  { name: '태화강역(1번 정류소)', lat: 35.53964151, lng: 129.3535299, id: '12313', type: 'taehwa' },
  { name: '태화강역(2번 정류소)', lat: 35.53891628, lng: 129.3530622, id: '12314', type: 'taehwa' },
  { name: '태화강역광장', lat: 35.54169668, lng: 129.3533893, id: '12310', type: 'taehwa' },
];

// 타입별 마커 색상
const MARKER_COLORS = {
  ktx: '#E85D24',      // 주황 (KTX울산역)
  citytour: '#3B82F6', // 파랑 (시티투어)
  taehwa: '#10B981',   // 초록 (태화강)
  all: '#6B7280',      // 회색 (일반 정류장)
};

let map;
let keyMarkers = [];
let allMarkers = [];
let stationsVisible = false;

kakao.maps.load(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(35.5506, 129.1389), // 울산역 중심
    level: 9,
  };
  map = new kakao.maps.Map(container, options);

  // 초기에 핵심 정류장 표시
  showKeyStations();
});

// 핵심 정류장 마커 표시
function showKeyStations() {
  KEY_STATIONS.forEach(s => {
    const content = `
      <div style="
        background:${MARKER_COLORS[s.type]};
        color:white;
        padding:4px 8px;
        border-radius:12px;
        font-size:11px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ">${s.name}</div>
    `;
    const overlay = new kakao.maps.CustomOverlay({
      map,
      position: new kakao.maps.LatLng(s.lat, s.lng),
      content,
      yAnchor: 1.3,
    });
    keyMarkers.push(overlay);
  });
}

// 전체 정류장 핀 표시 / 숨기기 토글
function showStations() {
  if (stationsVisible) {
    allMarkers.forEach(m => m.setMap(null));
    allMarkers = [];
    stationsVisible = false;
    document.getElementById('btn-stations').textContent = '🚏 정류장 보기';
  } else {
    ALL_STATIONS.forEach(s => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(s.lat, s.lng),
        title: s.name,
      });
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:6px 10px;font-size:13px;font-weight:600">${s.name}<br><span style="color:#888;font-size:11px">정류장 번호: ${s.id}</span></div>`
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
      allMarkers.push(marker);
    });
    stationsVisible = true;
    document.getElementById('btn-stations').textContent = '🚏 정류장 숨기기';
  }
}

// 지도에 경로 선 그리기
function drawRoute(coords) {
  const linePath = coords.map(c => new kakao.maps.LatLng(c.lat, c.lng));
  const polyline = new kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 4,
    strokeColor: '#3B82F6',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  });
  polyline.setMap(map);
}

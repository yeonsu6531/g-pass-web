// ===== 정류장 데이터 =====

// KTX 울산역 정류장
const STATIONS_KTX = [
  { name: 'KTX울산역(3000, 3100)', lat: 35.55064862, lng: 129.1388408, id: '15413' },
  { name: '울산역(시내 방면)', lat: 35.55161809, lng: 129.1389054, id: '15414' },
  { name: '울산역(언양 방면)', lat: 35.55172615, lng: 129.1389094, id: '15429' },
  { name: '울산역(종점)', lat: 35.55119682, lng: 129.1388802, id: '15415' },
  { name: '울산역(343 삼남방면)', lat: 35.55167461, lng: 129.1389122, id: '15419' },
];

// 시티투어 정류장
const STATIONS_CITYTOUR = [
  { name: '시티버스-태화강국가정원(오산광장)', lat: 35.5496894, lng: 129.2921248, id: '90008' },
  { name: '시티버스-태화강국가정원(회전교차로)', lat: 35.55058213, lng: 129.2991847, id: '90009' },
  { name: '시티버스-태화강전망대(동굴피아)', lat: 35.54451058, lng: 129.2934244, id: '90006' },
  { name: '시티버스-태화강역', lat: 35.53830275, lng: 129.3527577, id: '90000' },
  { name: '시티버스-태화루', lat: 35.55396977, lng: 129.3069833, id: '90010' },
  { name: '시티버스-태화교정류장', lat: 35.54959959, lng: 129.3073377, id: '90005' },
  { name: '시티버스-삼호대숲(철새홍보관)', lat: 35.55094209, lng: 129.2780942, id: '90007' },
  { name: '시티버스-롯데광장', lat: 35.53850294, lng: 129.3393616, id: '90002' },
  { name: '시티버스-롯데시티호텔', lat: 35.53767622, lng: 129.3297082, id: '90003' },
  { name: '시티버스-스타즈호텔', lat: 35.53999028, lng: 129.34721, id: '90001' },
  { name: '시티버스-현대백화점', lat: 35.54060365, lng: 129.3355807, id: '90004' },
  { name: '시티버스-문화예술회관', lat: 35.5431855, lng: 129.3253116, id: '90013' },
  { name: '시티버스-고래박물관', lat: 35.50339988, lng: 129.3805682, id: '90016' },
  { name: '시티버스-대왕암공원', lat: 35.49012699, lng: 129.4359733, id: '90018' },
  { name: '시티버스-대교전망대입구', lat: 35.50373789, lng: 129.4167981, id: '90017' },
  { name: '시티버스-시계탑사거리(울산시립미술관)', lat: 35.55520345, lng: 129.3214523, id: '90011' },
  { name: '시티버스-중앙전통시장', lat: 35.55426224, lng: 129.3236524, id: '90012' },
];

// 주요 관광지 인근 정류장
const STATIONS_TOURIST = [
  // 태화강국가정원
  { name: '태화강국가정원 동강병원', lat: 35.55253514, lng: 129.3007721, id: '21210', spot: '태화강국가정원' },
  { name: '태화강국가정원 로터리', lat: 35.5510717, lng: 129.2997953, id: '21214', spot: '태화강국가정원' },
  // 대왕암공원
  { name: '대왕암공원', lat: 35.49007834, lng: 129.4359918, id: '61016', spot: '대왕암공원' },
  // 장생포고래박물관
  { name: 'SK에너지앞(고래박물관)', lat: 35.49363454, lng: 129.3809381, id: '23532', spot: '장생포고래박물관' },
  // 울산대공원
  { name: '대공원', lat: 35.5318657, lng: 129.2937066, id: '21903', spot: '울산대공원' },
  // 십리대숲
  { name: '남구둔치주차장(십리대숲)', lat: 35.54959688, lng: 129.3074188, id: '21220', spot: '십리대숲' },
  // 반구대암각화
  { name: '대곡박물관(반구대암각화)', lat: 35.61880551, lng: 129.1683385, id: '30357', spot: '반구대암각화' },
  { name: '울산암각화박물관', lat: 35.60858511, lng: 129.1700888, id: '30362', spot: '반구대암각화' },
  // 울산대교전망대
  { name: '과학대정문(대교전망대)', lat: 35.49787036, lng: 129.4177703, id: '70703', spot: '울산대교전망대' },
  // 간절곶
  { name: '간절곶', lat: 35.35942564, lng: 129.3552643, id: '23313', spot: '간절곶' },
  // 태화강역
  { name: '태화강역(1번 정류소)', lat: 35.53964151, lng: 129.3535299, id: '12313', spot: '태화강역' },
  { name: '태화강역(2번 정류소)', lat: 35.53891628, lng: 129.3530622, id: '12314', spot: '태화강역' },
  { name: '태화강역광장', lat: 35.54169668, lng: 129.3533893, id: '12310', spot: '태화강역' },
];

// ===== 마커 색상 =====
const COLORS = {
  ktx:      { bg: '#E85D24', label: '🚆 KTX' },
  citytour: { bg: '#3B82F6', label: '🚌 시티투어' },
  tourist:  { bg: '#10B981', label: '📍 관광지' },
  all:      { bg: '#6B7280', label: '🚏 전체' },
};

let map;
let activeMarkers = [];
let allStationMarkers = [];
let allStationsVisible = false;

kakao.maps.load(() => {
  const container = document.getElementById('map');
  map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(35.5506, 129.1389),
    level: 9,
  });
});

// ===== 카테고리별 정류장 표시 =====
function toggleCategory(type) {
  // 같은 버튼 다시 누르면 끄기
  const btn = document.getElementById(`btn-cat-${type}`);
  const isActive = btn.classList.contains('active');

  if (isActive) {
    clearMarkers();
    btn.classList.remove('active');
    return;
  }

  clearMarkers();
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  let data = [];
  if (type === 'ktx') data = STATIONS_KTX;
  else if (type === 'citytour') data = STATIONS_CITYTOUR;
  else if (type === 'tourist') data = STATIONS_TOURIST;
  else if (type === 'all') {
    // 전체 정류장 → 클러스터러로 묶어서 표시 (렉 방지)
    const markers = ALL_STATIONS.map(s => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(s.lat, s.lng),
        title: s.name,
      });
      const iw = new kakao.maps.InfoWindow({
        content: `<div style="padding:6px 10px;font-size:12px;font-weight:600">${s.name}<br><span style="color:#888;font-size:11px">번호: ${s.id}</span></div>`
      });
      kakao.maps.event.addListener(marker, 'click', () => iw.open(map, marker));
      allStationMarkers.push(marker);
      return marker;
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 5,
      disableClickZoom: false,
      styles: [{
        width: '40px', height: '40px',
        background: 'rgba(107,114,128,0.85)',
        borderRadius: '50%',
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        lineHeight: '40px',
        fontSize: '13px',
      }],
    });
    clusterer.addMarkers(markers);
    allStationMarkers.push(clusterer);
    map.setLevel(8);
    return;
  }

  data.forEach(s => {
    const color = COLORS[type].bg;
    const spotLabel = s.spot ? `<br><span style="color:rgba(255,255,255,0.8);font-size:10px">${s.spot}</span>` : '';
    const content = `
      <div style="
        background:${color};
        color:white;
        padding:5px 10px;
        border-radius:14px;
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        cursor:pointer;
        line-height:1.4;
      ">${s.name}${spotLabel}</div>
    `;
    const overlay = new kakao.maps.CustomOverlay({
      map,
      position: new kakao.maps.LatLng(s.lat, s.lng),
      content,
      yAnchor: 1.3,
    });
    activeMarkers.push(overlay);
  });

  // 지도 범위 자동 조정
  if (data.length > 0) {
    if (type === 'ktx') {
      map.setCenter(new kakao.maps.LatLng(35.5511, 129.1389));
      map.setLevel(4);
    } else {
      const bounds = new kakao.maps.LatLngBounds();
      data.forEach(s => bounds.extend(new kakao.maps.LatLng(s.lat, s.lng)));
      map.setBounds(bounds);
    }
  }
}

function clearMarkers() {
  activeMarkers.forEach(m => m.setMap(null));
  activeMarkers = [];
  allStationMarkers.forEach(m => {
    if (m.setMap) m.setMap(null);       // 일반 마커
    else if (m.clear) m.clear();         // 클러스터러
  });
  allStationMarkers = [];
}

// 경로 선 그리기
function drawRoute(coords) {
  new kakao.maps.Polyline({
    map,
    path: coords.map(c => new kakao.maps.LatLng(c.lat, c.lng)),
    strokeWeight: 4,
    strokeColor: '#3B82F6',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  }).setMap(map);
}

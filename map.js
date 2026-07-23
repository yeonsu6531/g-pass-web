// 울산역 주요 정류장 데이터 (팀원 분석 후 채워넣을 것)
const STATIONS = [
  { name: "KTX 울산역", lat: 35.5581, lng: 129.2987, id: "ULS001" },
  { name: "울산역 5001번 정류장", lat: 35.5578, lng: 129.2995, id: "ULS002" },
  { name: "태화강국가정원 정류장", lat: 35.5435, lng: 129.3312, id: "ULS003" },
  { name: "울산시청 환승정류장", lat: 35.5390, lng: 129.3114, id: "ULS004" },
];

let map;
let markers = [];
let stationsVisible = false;

// 지도 초기화
kakao.maps.load(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(35.5581, 129.2987), // 울산역 중심
    level: 5,
  };
  map = new kakao.maps.Map(container, options);
});

// 정류장 핀 표시 / 숨기기 토글
function showStations() {
  if (stationsVisible) {
    markers.forEach(m => m.setMap(null));
    markers = [];
    stationsVisible = false;
    document.getElementById('btn-stations').textContent = '🚏 정류장 보기';
  } else {
    STATIONS.forEach(s => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(s.lat, s.lng),
        title: s.name,
      });
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:6px 10px;font-size:13px;font-weight:600">${s.name}</div>`
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
      markers.push(marker);
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

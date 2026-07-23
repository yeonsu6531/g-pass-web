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

// 주요 관광지 인근 정류장 (핵심만)
const STATIONS_TOURIST = [
  { name: '태화강국가정원 동강병원', lat: 35.55253514, lng: 129.3007721, id: '21210', spot: '🌿 태화강국가정원' },
  { name: '태화강국가정원 로터리', lat: 35.5510717, lng: 129.2997953, id: '21214', spot: '🌿 태화강국가정원' },
  { name: '대왕암공원', lat: 35.49007834, lng: 129.4359918, id: '61016', spot: '🌊 대왕암공원' },
  { name: 'SK에너지앞(고래박물관 하차)', lat: 35.49363454, lng: 129.3809381, id: '23532', spot: '🐋 장생포고래박물관' },
  { name: '대공원', lat: 35.5318657, lng: 129.2937066, id: '21903', spot: '🏞 울산대공원' },
  { name: '남구둔치주차장(십리대숲)', lat: 35.54959688, lng: 129.3074188, id: '21220', spot: '🎋 십리대숲' },
  { name: '대곡박물관(반구대암각화)', lat: 35.61880551, lng: 129.1683385, id: '30357', spot: '🪨 반구대암각화' },
  { name: '울산암각화박물관', lat: 35.60858511, lng: 129.1700888, id: '30362', spot: '🪨 반구대암각화' },
  { name: '과학대정문(울산대교전망대)', lat: 35.49787036, lng: 129.4177703, id: '70703', spot: '🌉 울산대교전망대' },
  { name: '간절곶', lat: 35.35942564, lng: 129.3552643, id: '23313', spot: '🌅 간절곶' },
  { name: '태화강역(1번 정류소)', lat: 35.53964151, lng: 129.3535299, id: '12313', spot: '🚉 태화강역' },
  { name: '태화강역(2번 정류소)', lat: 35.53891628, lng: 129.3530622, id: '12314', spot: '🚉 태화강역' },
  { name: '태화강역광장', lat: 35.54169668, lng: 129.3533893, id: '12310', spot: '🚉 태화강역' },
];

const COLORS = {
  ktx:      '#E85D24',
  citytour: '#3B82F6',
  tourist:  '#10B981',
};

let map;
let activeMarkers = [];

kakao.maps.load(function() {
  map = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(35.5506, 129.1389),
    level: 9,
  });
});

function toggleCategory(type) {
  var btn = document.getElementById('btn-cat-' + type);
  var isActive = btn.classList.contains('active');

  clearMarkers();
  document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); });

  if (isActive) return; // 같은 버튼 누르면 끄기
  btn.classList.add('active');

  var data = type === 'ktx' ? STATIONS_KTX : type === 'citytour' ? STATIONS_CITYTOUR : STATIONS_TOURIST;
  var color = COLORS[type];

  data.forEach(function(s) {
    var spotLine = s.spot ? '<br><span style="color:rgba(255,255,255,0.85);font-size:10px">' + s.spot + '</span>' : '';
    var content = '<div style="background:' + color + ';color:white;padding:5px 10px;border-radius:14px;font-size:12px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);line-height:1.5">' + s.name + spotLine + '</div>';
    var overlay = new kakao.maps.CustomOverlay({
      map: map,
      position: new kakao.maps.LatLng(s.lat, s.lng),
      content: content,
      yAnchor: 1.4,
    });
    activeMarkers.push(overlay);
  });

  // 지도 범위 자동 조정
  if (type === 'ktx') {
    map.setCenter(new kakao.maps.LatLng(35.5511, 129.1389));
    map.setLevel(4);
  } else {
    var bounds = new kakao.maps.LatLngBounds();
    data.forEach(function(s) { bounds.extend(new kakao.maps.LatLng(s.lat, s.lng)); });
    map.setBounds(bounds);
  }
}

function clearMarkers() {
  activeMarkers.forEach(function(m) { m.setMap(null); });
  activeMarkers = [];
}

function drawRoute(coords) {
  new kakao.maps.Polyline({
    map: map,
    path: coords.map(function(c) { return new kakao.maps.LatLng(c.lat, c.lng); }),
    strokeWeight: 4,
    strokeColor: '#3B82F6',
    strokeOpacity: 0.8,
  });
}

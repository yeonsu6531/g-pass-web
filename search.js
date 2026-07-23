let selectedDest = null;
let ps; // 장소 검색 서비스

kakao.maps.load(() => {
  ps = new kakao.maps.services.Places();
});

function showRoutePanel() {
  document.getElementById('route-panel').classList.remove('hidden');
  document.getElementById('detail-panel').classList.add('hidden');
}

function closeRoutePanel() {
  document.getElementById('route-panel').classList.add('hidden');
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('route-results').classList.add('hidden');
}

// 현재 위치 가져오기
function useCurrentLocation() {
  if (!navigator.geolocation) {
    alert('위치 정보를 사용할 수 없습니다.');
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    document.getElementById('input-origin').value = '현재 위치';
    document.getElementById('input-origin').dataset.lat = lat;
    document.getElementById('input-origin').dataset.lng = lng;

    // 지도 이동
    map.setCenter(new kakao.maps.LatLng(lat, lng));

    new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(lat, lng),
    });
  });
}

// 목적지 검색
function searchDest() {
  const keyword = document.getElementById('input-dest').value.trim();
  if (!keyword) return;

  ps.keywordSearch(keyword, (result, status) => {
    const list = document.getElementById('search-results');
    list.innerHTML = '';

    if (status === kakao.maps.services.Status.OK) {
      result.slice(0, 5).forEach(place => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="place-name">${place.place_name}</div>
          <div class="place-addr">${place.address_name}</div>
        `;
        li.onclick = () => selectDest(place);
        list.appendChild(li);
      });
    } else {
      list.innerHTML = '<li style="padding:12px;color:#999">검색 결과가 없습니다</li>';
    }
  });
}

// 목적지 선택
function selectDest(place) {
  selectedDest = place;
  document.getElementById('input-dest').value = place.place_name;
  document.getElementById('search-results').innerHTML = '';

  // 지도에 목적지 마커
  const destLatLng = new kakao.maps.LatLng(place.y, place.x);
  new kakao.maps.Marker({ map, position: destLatLng });
  map.setCenter(destLatLng);

  // 경로 추천 실행
  recommendRoutes();
}

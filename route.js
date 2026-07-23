// 팀원(이창원) 미스매치 분석 결과 기반 경로 데이터
// 7월 분석 완료 후 실제 데이터로 교체할 것
const ROUTE_DATA = [
  {
    rank: 1,
    label: "대기 최소 경로",
    totalTime: 42,
    waitTotal: 15,
    steps: [
      {
        type: "walk",
        icon: "🚶",
        title: "울산역 1번 출구 → 807번 정류장",
        sub: "도보 약 3분",
        wait: null,
      },
      {
        type: "bus",
        icon: "🚌",
        title: "807번 탑승",
        sub: "정류장 번호: ULS002",
        wait: "약 8분 후 도착",
        busNo: "807",
        stationId: "ULS002",
      },
      {
        type: "transfer",
        icon: "🔄",
        title: "울산시청 환승",
        sub: "정류장 번호: ULS004 하차 후 환승",
        wait: "환승 대기 약 7분",
        stationId: "ULS004",
      },
      {
        type: "bus",
        icon: "🚌",
        title: "126번 탑승 → 목적지",
        sub: "소요 약 20분",
        wait: null,
      },
    ],
  },
  {
    rank: 2,
    label: "직행 경로",
    totalTime: 55,
    waitTotal: 38,
    steps: [
      {
        type: "walk",
        icon: "🚶",
        title: "울산역 2번 출구 → 5001번 정류장",
        sub: "도보 약 2분",
        wait: null,
      },
      {
        type: "bus",
        icon: "🚌",
        title: "5001번 리무진 탑승",
        sub: "정류장 번호: ULS002",
        wait: "약 38분 후 도착 (대기 김)",
        busNo: "5001",
        stationId: "ULS002",
      },
      {
        type: "bus",
        icon: "🏁",
        title: "목적지 도착",
        sub: "소요 약 17분",
        wait: null,
      },
    ],
  },
  {
    rank: 3,
    label: "시티투어 경로",
    totalTime: 60,
    waitTotal: 20,
    steps: [
      {
        type: "walk",
        icon: "🚶",
        title: "울산역 광장 → 시티투어 승차장",
        sub: "도보 약 5분",
        wait: null,
      },
      {
        type: "bus",
        icon: "🚌",
        title: "울산 시티투어 탑승",
        sub: "정류장 번호: ULS005",
        wait: "약 20분 후 출발",
        busNo: "시티투어",
        stationId: "ULS005",
      },
      {
        type: "bus",
        icon: "🏁",
        title: "목적지 하차",
        sub: "소요 약 35분",
        wait: null,
      },
    ],
  },
];

// 경로 추천 실행
async function recommendRoutes() {
  const container = document.getElementById('route-results');
  container.classList.remove('hidden');
  container.innerHTML = '<p style="padding:12px;color:#888">경로 분석 중...</p>';

  // 실시간 버스 도착정보 반영
  for (const route of ROUTE_DATA) {
    for (const step of route.steps) {
      if (step.stationId && step.busNo) {
        const arrivals = await getBusArrival(step.stationId);
        const matched = arrivals.find(a => a.busNo === step.busNo);
        if (matched) {
          step.wait = `약 ${matched.arrMin}분 후 도착`;
        }
      }
    }
  }

  renderRouteCards(ROUTE_DATA);
}

function renderRouteCards(routes) {
  const container = document.getElementById('route-results');
  container.innerHTML = routes.map(r => `
    <div class="route-card" onclick="showDetail(${r.rank - 1})">
      <div class="route-rank">${r.rank}순위 추천</div>
      <div class="route-summary">${r.label}</div>
      <div class="route-time">⏱ 총 소요 약 ${r.totalTime}분</div>
      <div class="route-wait">⏳ 총 대기 약 ${r.waitTotal}분</div>
    </div>
  `).join('');
}

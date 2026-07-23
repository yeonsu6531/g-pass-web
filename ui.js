// 경로 상세 화면
function showDetail(index) {
  const route = ROUTE_DATA[index];
  document.getElementById('route-panel').classList.add('hidden');
  const detail = document.getElementById('detail-panel');
  detail.classList.remove('hidden');
  document.getElementById('detail-title').textContent = `${route.rank}순위 · ${route.label}`;

  const content = document.getElementById('detail-content');
  content.innerHTML = `
    <div style="padding:12px 0 16px;border-bottom:1px solid #f0f0f0;margin-bottom:8px">
      <span style="font-size:13px;color:#888">총 소요</span>
      <span style="font-size:18px;font-weight:700;margin-left:8px">${route.totalTime}분</span>
      <span style="font-size:13px;color:#E85D24;margin-left:12px">대기 ${route.waitTotal}분</span>
    </div>
    ${route.steps.map(step => `
      <div class="step">
        <div class="step-icon">${step.icon}</div>
        <div class="step-info">
          <div class="step-title">${step.title}</div>
          <div class="step-sub">${step.sub}</div>
          ${step.wait ? `<div class="step-wait">${step.wait}</div>` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function backToRoutes() {
  document.getElementById('detail-panel').classList.add('hidden');
  document.getElementById('route-panel').classList.remove('hidden');
}

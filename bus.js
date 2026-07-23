// 공공데이터포털 울산 버스 실시간 도착정보 API
// API 키는 data.go.kr 신청 후 발급받아 여기에 입력
const BUS_API_KEY = 'YOUR_PUBLIC_DATA_API_KEY';

// 정류장 번호로 버스 도착정보 가져오기
async function getBusArrival(stationId) {
  try {
    const url = `https://apis.data.go.kr/6310000/busArrivalService/getBusArrivalItem`
      + `?serviceKey=${BUS_API_KEY}`
      + `&stationId=${stationId}`
      + `&_type=json`;

    const res = await fetch(url);
    const data = await res.json();
    const items = data?.response?.body?.items?.item;

    if (!items) return [];
    const list = Array.isArray(items) ? items : [items];

    return list.map(item => ({
      busNo: item.routeNo,         // 버스 번호
      arrTime: item.arrTime,       // 도착까지 남은 시간(초)
      arrMin: Math.ceil(item.arrTime / 60), // 분으로 변환
    }));
  } catch (e) {
    console.error('버스 API 오류:', e);
    // API 키 없을 때 테스트용 더미 데이터 반환
    return [
      { busNo: '807', arrTime: 180, arrMin: 3 },
      { busNo: '5001', arrTime: 2400, arrMin: 40 },
    ];
  }
}

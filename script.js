function calculateETA() {

    // 입력값 가져오기
    const currentFloor = parseInt(
        document.getElementById("currentFloor").value
    );

    const stopsInput =
        document.getElementById("stops").value;

    const userFloor = parseInt(
        document.getElementById("userFloor").value
    );

    // 정차 층 배열 변환
    let stops = [];

    if (stopsInput.trim() !== "") {
        stops = stopsInput
            .split(",")
            .map(num => parseInt(num.trim()));
    }

    // 시간 설정
    const moveTimePerFloor = 2; // 1층 이동 = 2초
    const stopTime = 5; // 정차 시간 = 5초

    let totalTime = 0;
    let current = currentFloor;

    // 정차 층 계산
    for (let stop of stops) {

        // 이동 시간
        totalTime +=
            Math.abs(stop - current) *
            moveTimePerFloor;

        // 정차 시간
        totalTime += stopTime;

        current = stop;
    }

    // 사용자 층까지 이동
    totalTime +=
        Math.abs(userFloor - current) *
        moveTimePerFloor;

    // 결과 출력
    document.getElementById("result").innerHTML =
        `⏱ 예상 도착 시간: ${totalTime}초`;
}

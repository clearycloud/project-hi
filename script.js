function calculateETA(){

    // 입력값
    const currentFloor =
        parseInt(
            document.getElementById("currentFloor").value
        );

    const userFloor =
        parseInt(
            document.getElementById("userFloor").value
        );

    const stopsInput =
        document.getElementById("stops").value;

    const doorMode =
        document.getElementById("doorMode").value;

    // 정차 층 배열 변환
    let stops=[];

    if(stopsInput.trim()!==""){
        stops = stopsInput
            .split(",")
            .map(x=>parseInt(x.trim()));
    }

    // ===== 실제 측정 데이터 기반 =====

    // 평균 층 이동 시간
    const FLOOR_TIME = 4.1;

    // 정차 시 추가 지연
    const STOP_DELAY = 19;

    // 문 시간
    const AUTO_DOOR = 17.01;
    const BUTTON_DOOR = 9.43;

    let totalTime = 0;
    let current = currentFloor;

    // ===== 정차 층 계산 =====

    for(let stop of stops){

        // 층 이동 시간
        totalTime +=
            Math.abs(stop-current)
            * FLOOR_TIME;

        // 정차 시간
        totalTime += STOP_DELAY;

        current = stop;
    }

    // ===== 사용자 층까지 이동 =====

    totalTime +=
        Math.abs(userFloor-current)
        * FLOOR_TIME;

    // ===== 문 처리 =====

    if(doorMode==="auto"){
        totalTime += AUTO_DOOR;
    }
    else{
        totalTime += BUTTON_DOOR;
    }

    // ===== 결과 출력 =====

    document.getElementById("result").innerHTML =
    `
    ⏱ 예상 도착 시간<br>
    ${totalTime.toFixed(2)}초
    `;
}

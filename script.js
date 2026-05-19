function calculateETA(){

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

    let stops=[];

    if(stopsInput.trim()!==""){

        stops = stopsInput
            .split(",")
            .map(x=>parseInt(x.trim()));
    }

    // ===== 실제 측정 데이터 =====

    const FLOOR_TIME = 4.1;

    const STOP_DELAY = 19;

    const AUTO_DOOR = 17.01;

    const BUTTON_DOOR = 9.43;

    let totalTime = 0;

    let current = currentFloor;

    // ===== 중간 정차 =====

    for(let stop of stops){

        totalTime +=
            Math.abs(stop-current)
            * FLOOR_TIME;

        totalTime += STOP_DELAY;

        current = stop;
    }

    // ===== 사용자 층 =====

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

    // ===== 결과 =====

    document.getElementById("result").innerHTML=
    `
    ${totalTime.toFixed(2)}초
    `;
}

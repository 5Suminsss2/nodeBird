// saga는 제너레이터 문법을 사용함
// 근데 너무 놀라지 말고 그냥 그렇구나 하고 넘어도 됨

/* generator란?
const gen = function* () {
    console.log(1);
    yield;              // yeild까지만 가고 멈춤
    console.log(2);
    yeild;
    console.log(3);
    yeild 4;
}
gen(); // 이렇게 하면 안되고
gen.next(); // 이렇게 하면 실행됨 // 1 이 뜨고 yeild까지 실행하고 멈춤
gen.next(); // 이렇게 하면 실행됨 // 2 이 뜨고 yeild까지 실행하고 멈춤
gen.next(); // 이렇게 하면 실행됨 // 3 이 뜨고 yeild 4까지 실행 --> {value: 4, done: false} 하고 멈춤
gen.next(); // {value: undefined. done: true} // done이 true가 될때까지 next 가능



*/

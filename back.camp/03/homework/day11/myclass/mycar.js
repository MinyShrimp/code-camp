class MyCar {
    /**
     * 생성자
     * @param {string} name
     * @param {number} power
     * @param {string} color
     */
    constructor(name, power, color) {
        this.name  = name ?? ""; // name이 undefined가 들어오면, 오른쪽을 반환
        this.power = power ?? 0;
        this.color = color ?? "#000000";
    }

    /**
     * 출발하기
     */
    start = () => {
        console.log(`${this.name} 출발`);
    };

    /**
     * 정지하기
     */
    stop = () => {
        console.log(`${this.name} 정지`);
    };

    /**
     * 문자열로 가져오기
     */
    toString = () => {
        return `기종: ${this.name}, 마력: ${this.power}, 색상: ${this.color}`;
    }
}

const myCar = new MyCar("아반떼 하이브리드 CN7");
myCar.start();
myCar.stop();

console.log(myCar.toString());
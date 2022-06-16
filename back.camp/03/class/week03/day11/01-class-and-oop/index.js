
class Monster {
    constructor( name, power = 10 ) {
        this.name = name;
        this.power = power;
    }

    attack = () => {
        console.log(`${this.name} 공격 : ${this.power}`);
    }

    run = () => {
        console.log(`${this.name} 도망`);
    }

    toString = () => {
        return `${this.name}, ${this.power}`;
    }
}

const m1 = new Monster( "거북이" );
m1.attack();
m1.run();

const m2 = new Monster( "토끼", 50 );
m2.attack();
m2.run();

console.log(m1);
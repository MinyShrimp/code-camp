
class Monster {
    constructor( name, power ) {
        this.name = name;
        this.power = power;
    }

    attack = () => {
        console.log(`${this.name} 공격 : ${this.power}`);
    }

    toString = () => {
        return `${this.name}, ${this.power}`;
    }
}

class SkyMonster extends Monster {
    run = () => {
        console.log(`${this.name} 날아서 도망`);
    }
}

class GroundMonster extends Monster {
    run = () => {
        console.log(`${this.name} 뛰어서 도망`);
    }
}

const sky = new SkyMonster( "매", 10 );
const turtle = new GroundMonster( "거북이", 5 );

sky.attack();
sky.run();
console.log();

turtle.attack();
turtle.run();
console.log();

console.log( sky.toString() );
console.log( turtle.toString() );
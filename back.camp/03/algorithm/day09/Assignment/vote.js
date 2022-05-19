//assignment
function vote(str) {
    // 아래에 코드를 작성해주세요.
    let answer = new Map();

    [...str].forEach(v => {
        if( answer.keys().includes(v) ) {
            answer.set( v, answer.get(v) + 1 );
        } else {
            answer.set( v, 1 );
        }
    });
    
    const max = Math.max( answer.values() );
    return [...answer.entries()].filter(v => v[1] === max)[0][0];
}

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = vote;

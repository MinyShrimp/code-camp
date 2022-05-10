//assignment

/**
 * param: [87, 89, 92, 100, 76]
 * return: [4, 3, 2, 1, 5]
 */
function takeRank(arr) {
    // 아래에 코드를 작성해주세요.

    // 0. arr = [3, 2, 3, 1];
    let result = {}, rank_index = 1, ranks = [];

    // 1.
    // result = { 
    //      '1': [ { index: 3, rank: -1 } ], 
    //      '2': [ { index: 1, rank: -1 } ], 
    //      '3': [ { index: 0, rank: -1 }, { index: 2, rank: -1 } ] 
    // };
    arr.forEach((v, i) => {
        if( Object.keys(result).includes(String(v)) ) {
            result[v].push( { index: i, rank: -1 } );
        } else {
            result[v] = [{ index: i, rank: -1 }];
        }
        ranks.push(0);
    });

    // 2. keys 내림차순 정렬, value 복사
    const keys = Object.keys(result), values = Object.values(result);
    keys.sort((v1, v2) => { return v2 - v1 });

    // 3. rank 매기기
    keys.forEach(v => {
        result[v].forEach(r => {
            r.rank = rank_index;
        });
        rank_index += 1;
    });

    // 4. index를 기준으로 rank 넣기
    values.forEach(v => {
        v.forEach(r => {
            ranks[r.index] = r.rank;
        })
    })

    return ranks;
}

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = takeRank;
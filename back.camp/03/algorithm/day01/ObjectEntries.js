/*
  어떤 게임의 평점이 담긴 객체가 있습니다. 
  난이도별로 객체를 만들어, 배열 result에 담아 출력할 수 있도록
  for문을 완성해주세요.
  
  [ {난이도 : 점수}, {난이도 : 점수}, ... ]
*/

const score = {
    easy: 234,
    normal: 759,
    hard: 677,
    nightmare: 46
  };
  
  const arr = Object.entries(score);
  console.log(arr);
  // [
  //   [ 'easy', 234 ],
  //   [ 'normal', 759 ],
  //   [ 'hard', 677 ],
  //   [ 'nightmare', 46 ]
  // ]
  
  let result = [];
  
  // for문을 완성해주세요.
  arr.forEach(v => {
    const key = v[0], value = v[1];
    result.push( JSON.parse(`{ "${key}": ${value} }`) );
  });
  
  console.log("결과", result);
  // [ { easy: 234 }, { normal: 759 }, { hard: 677 }, { nightmare: 46 } ]
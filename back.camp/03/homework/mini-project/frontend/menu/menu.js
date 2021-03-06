// 커피 목록 조회 API를 요청해주세요.
const getCoffee = async () => {
    console.log("index.js 파일의 openMenu 함수 안에서 getCoffee가 실행 됨");

    /////////////////////////////////////////

    // 1. 백엔드 서버로 /starbucks API 요청해 커피 데이터를 받는다.
    const res = await goServerGet( '/starbucks' );

    // // 2. 받은 데이터로 createMenuCard 함수를 이용해 메뉴 카드를 모두 만들어주세요.
    res.data.forEach(value => {
        createMenuCard( value );
    });
    
    /////////////////////////////////////////
};

// 
const createMenuCard = ( data ) => {
    const menuCardWrapper = document.createElement("div");
    menuCardWrapper.className = "Menu_Card_Wrapper";

    const menuCardImgBox = document.createElement("div");
    menuCardImgBox.className = "Menu_Card_ImgBox";
    menuCardImgBox.style.backgroundImage = `url('${data?.img ?? ""}')`;
    menuCardImgBox.style.backgroundSize = "cover";
    console.log(data.img)

    const menuCardName = document.createElement("div");
    menuCardName.className = "Menu_Card_Name";
    menuCardName.textContent = data?.name ?? "메뉴이름"; // bug fix : data?.name || "메뉴이름" => data?.name ?? "메뉴이름"

    const menuWrapper = document.querySelector("#Menu_Background");
    menuCardWrapper.appendChild(menuCardImgBox);
    menuCardWrapper.appendChild(menuCardName);
    menuWrapper.appendChild(menuCardWrapper);
};

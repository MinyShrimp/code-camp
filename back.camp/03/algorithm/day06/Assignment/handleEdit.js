//assignment
const handleEdit = (nickname, interests) => {
    const handleObj = {
        // 아래에 코드를 작성해주세요.
        nickname: nickname,
        interests: interests.split(', '),
        bio: ``,
    };
    handleObj.bio = `제 닉네임은 ${nickname}입니다. 취미는 ${handleObj.interests.join(',')}입니다.`;

    return handleObj;
};

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = handleEdit;

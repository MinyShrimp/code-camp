
import axios from "axios";

const URL = "https://koreanjson.com/posts/1";

// 비동기 방식
const SyncFetchPost = () => {
    axios.get(URL).then(res => {
        console.log(res.data);
    });
    console.log('sync')
}
SyncFetchPost();

// 동기 방식
const ASyncFetchPost = async () => {
    const result = await axios.get(URL);
    console.log(result.data);
}
ASyncFetchPost();
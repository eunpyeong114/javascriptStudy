import axios from "axios";

// 1. 비동기 방식
function fetchAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기방식: ", result); // Promise{ <pending> }
}

fetchAsync();

// 2. 동기방식
// async function fetchSync() {         // => 함수 중복 선언 문제로 화살표 함수로 바꾸자!
//   const result = await axios.get("https://koreanjson.com/posts/1");
//   //   console.log("동기방식: ", result); // 제대로 된 결과 => { title: "..." }
//   console.log("동기방식: ", result.data);
// }

// fetchSync();

// 3. 화살표 함수를 사용할때는 async는 어디에 붙여야하는지!
const fetchSync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  //   console.log("동기방식: ", result); // 제대로 된 결과 => { title: "..." }
  console.log("동기방식: ", result.data);
};

fetchSync();

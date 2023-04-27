//1번째 계단에서 100번째 계단까지 최소 몇걸음이면 가는지?
//한걸음당 최대 2계단

let answer = 0;
const limit = 100;
for (let i = 1; i < limit; i = i + 2) {
  answer = answer + 1;
}

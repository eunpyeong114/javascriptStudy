// 운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다. 이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.

// 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
// 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
// 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
//   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
// 예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고, 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.

// 현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와, 몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때, 해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// priorities의 길이는 1 이상 100 이하입니다.
// priorities의 원소는 1 이상 9 이하의 정수입니다.
// priorities의 원소는 우선순위를 나타내며 숫자가 클 수록 우선순위가 높습니다.
// location은 0 이상 (대기 큐에 있는 프로세스 수 - 1) 이하의 값을 가집니다.
// priorities의 가장 앞에 있으면 0, 두 번째에 있으면 1 … 과 같이 표현합니다.
// 입출력 예
// priorities	location	return
// [2, 1, 3, 2]	2	1
// [1, 1, 9, 1, 1, 1]	0	5
// 입출력 예 설명
// 예제 #1

// 문제에 나온 예와 같습니다.

// 예제 #2

// 6개의 프로세스 [A, B, C, D, E, F]가 대기 큐에 있고 중요도가 [1, 1, 9, 1, 1, 1] 이므로 [C, D, E, F, A, B] 순으로 실행됩니다. 따라서 A는 5번째로 실행됩니다.

// 내 풀이
function solution(priorities, location) {
  let targetLocation = location;
  let max = Math.max(...priorities);
  let list = [...priorities];
  for (let i = 1; i <= priorities.length; i++) {
    let maxLocation = list.indexOf(max);
    let front = list.slice(0, maxLocation);
    let back = list.slice(maxLocation + 1);

    list = back.concat(front);

    if (maxLocation === targetLocation) {
      return i;
    } else if (targetLocation < maxLocation) {
      targetLocation += back.length;
    } else if (targetLocation > maxLocation) {
      targetLocation -= front.length + 1;
    }
    max = Math.max(...list);
  }
}

// 다른 풀이
function solution(priorities, location) {
  const origin = priorities[location];
  priorities[location] = "a";

  let answer = 0;
  while (true) {
    const search = priorities.indexOf("a");
    priorities[search] = origin;
    const max = Math.max(...priorities);
    priorities[search] = "a";

    if (priorities[0] === "a") {
      // 대기열의 가장 앞에 있는 프로세스가 내가 실행하고자 하는 프로세스가 맞을 때
      if (max === origin) {
        return ++answer;
      }
    }
    if (priorities[0] === max) {
      // 현재 실행하려는 프로세스가 가장 높은 우선순위를 가지고 있다면
      // 현재 프로세스를 실행한다.
      priorities.shift();
      answer++;
    } else {
      priorities.push(priorities.shift());
      // priorities.push(priorities[0]);
      // priorities.shift()
      // 현재 실행하려는 프로세스보다 더 높은 우선순위를 가진 프로세스가 있다면
      // 현재 프로세스를 뒤로 보낸다.
    }
  }
}

// 재귀함수를 통한 풀이
function solution(priorities, location) {
  const origin = priorities[location];
  priorities[location] = "a";

  const recursion = function (count) {
    const search = priorities.indexOf("a");
    priorities[search] = origin;
    const max = Math.max(...priorities);
    priorities[search] = "a";

    if (priorities[0] === "a" && max === origin) return ++count;

    priorities[0] === max ? count++ : priorities.push(priorities[0]);
    priorities.shift();
    // if(priorities[0]===max){
    //   priorities.shift();
    //   count++;
    // } else {
    //   priorities.push(priorities[0]);
    //   priorities.shift();
    // }

    return recursion(count);
  };

  return recursion(0);
}

// 자료구조 Queue 클래스를 이용한 풀이
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  peek() {
    return this.queue[this.front];
  }

  size() {
    return this.rear - this.front;
  }
}

function solution(priorities, location) {
  const origin = priorities[location];
  const q = new Queue();
  for (let i = 0; i < priorities.length; i++) {
    q.enqueue(priorities[i]);
  }
  q.queue[location] = "a";

  const recursion = function (count) {
    let search = 0;
    for (let i = 0; i < q.queue.length; i++) {
      if (q.queue[i] === "a") search = i;
    }
    q.queue[search] = origin;
    let max = 0;
    for (let num of q.queue) {
      if (max < num) max = num;
    }
    q.queue[search] = "a";

    const front = q.peek();
    if (front === "a" && origin === max) return ++count;

    front === max ? count++ : q.enqueue(front);
    q.dequeue();

    return recursion(count);
  };

  return recursion(0);
}

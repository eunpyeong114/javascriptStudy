import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// 타입을 정의  API 와 swagger를 같이 만듦 / 여기(typeDefs)가 스웨거
const typeDefs = `#graphql
  input ZZZ {   #return이 아닌 값 input으로 해야 됨
    writer:String
    title:String
    contents:String
  }


  type QQQ {  #return 값에 들어가는 건 type하면 됨
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    #fetchBoards: QQQ   
    fetchBoards: [QQQ]   
  }

  type Mutation {
    #createBoard(writer:String, title:String, contents: String): String
  createBoard(createBoardInput: ZZZ!): String
  }
`; //문자열이기 때문에 , 필요없음
//API 부분(아래)
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
      // 조회하면 데이터(게시글 번호 /작성자 /제목 /내용)를 '객체'형태 배열에 담겨서 변수로 저장하게 됨
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다~",
          contents: "내용이예요!!",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희입니다~",
          contents: "영희이예요!!",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이입니다~",
          contents: "훈이이예요!!",
        },
      ];
      // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)주기
      return result;
    },
  }, // 쿼리와 뮤테이션은 객체이기에 , 있어야함
  Mutation: {
    createBoard: (_, args) => {
      //(parent,args,context,info)
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args);
      //args 안에 브라우저에서 보내주는 정보가 들어옴
      // info는 API관련 부가정보
      // parent API->API 요청하는 경우 쓰임(전달인자 느낌) 안쓸때는 _ 입력
      // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정
      console.log(args.createBoard.writer);
      console.log(args.createBoard.title);
      console.log(args.createBoard.contents);
      // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
      return "게시글 등록에 성공하였습니다.";
    },
    // 과제) 아래 API가 작동되도록 만들기 - [1) phone.js 추가하기, 2) req/res 변경하기, 3)타입 작성하기, 4)import해오기
  },
};
//API 부분 (위)

// 위에서 스웨거랑 API 만들고 여기서 결합해서 서버를 만듦 (rest의 const app = express()와 같은 역할)
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server);

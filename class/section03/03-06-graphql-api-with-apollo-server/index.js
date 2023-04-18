import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// 타입을 정의  API 와 swagger를 같이 만듦 / 여기(typeDefs)가 스웨거
const typeDefs = `#graphql
  type Query {
    qqq: String
  }
`;
//API 부분(아래)
const resolvers = {
  Query: {
    qqq: () => {
      return "ㅁㅇㄴㄹㄴㅁㅇㄹㅇㄴ";
    },
  },
};
//API 부분 (위)

// 위에서 스웨거랑 API 만들고 여기서 결합해서 서버를 만듦 (rest의 const app = express()와 같은 역할)
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server);

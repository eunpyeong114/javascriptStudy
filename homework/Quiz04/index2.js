import express from "express";
const app = express();

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/starbucks.config.js";
const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get("/starbucks", (req, res) => {
  const result = [
    {
      name: "아메리카노",
      kcal: 5,
    },
    {
      name: "카페라떼",
      kcal: 10,
    },
    {
      name: "콜드브루",
      kcal: 15,
    },
    {
      name: "카페모카",
      kcal: 50,
    },
    {
      name: "돌체라떼",
      kcal: 500,
    },
    {
      name: "카라멜라떼",
      kcal: 200,
    },
    {
      name: "바닐라라떼",
      kcal: 20,
    },
    {
      name: "에스프레소",
      kcal: 1,
    },
    {
      name: "디카페인",
      kcal: 5,
    },
    {
      name: "오트라떼",
      kcal: 300,
    },
  ];
  res.send(result);
});

app.listen(2000);

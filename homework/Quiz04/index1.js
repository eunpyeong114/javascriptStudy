import express from "express";
const app = express();

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/user.config.js";
const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get("/users", function (req, res) {
  const result = [
    {
      email: "aaa@aaa.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "Nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Judy@judy.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Anna@anna.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Elsa@elsa.com",
      name: "Elsa",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];
  res.send(result);
});

app.listen(1000);

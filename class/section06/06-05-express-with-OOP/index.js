import express from "express";
import { ProductService } from "./product.js";
import { CashService } from "./cash.js";
const app = express();

// 상품 구매하기 API
app.post("/products/buy", function (req, res) {
  // 1. 가진 돈 검증하는 코드 (대략 10줄 정도 => 2줄로 줄임)
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  // 2. 판매여부 검증하는 코드(대략 10줄 정도 => 2줄로 줄임)
  const productService = new ProductService(); // class를 이용해서 productService라는 객체/instance 생성
  const isSoldout = productService.checkSoldout();

  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매 완료!!");
  }
});

// 상품 환불하기 API
app.post("/products/refund", function (req, res) {
  // 1. 판매여부 검증하는 코드(대략 10줄 정도 => 2줄로 줄임)
  const productService = new ProductService(); // class를 이용해서 productService라는 객체/instance 생성
  const isSoldout = productService.checkSoldout();

  // 2. 상품 환불하는 코드
  if (isSoldout) {
    res.send("상품 환불 완료!!");
  }
});
app.listen(3000);

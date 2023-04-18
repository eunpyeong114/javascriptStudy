import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
const app = express();
// === 의존성 주입으로 발생하는 장점!!! ===
// 1. new 한번으로 모든 곳에서 재사용가능 (싱글톤패턴)
// 2. 컨트롤러 코드를 수정하지 않고, 몽땅 한꺼번에 변경 가능
// 3. 현금으로 결제하던 것을 포인트로 변경 가능

//[부가설명]
// 1. ProductController가 CashService에 의존하고 있음 [의존성 : CashService]
//  => 이 상황을 "강하게 결합되어 있다"라고 표현
//  => tight-coupling

// 2. 이를 개선하기 위해서 "느슨한 결합"으로 변경할 필요가 있음
//  => loose-coupling
//  => [의존성: CashService]을 밖에서 집어 넣어 주기
//  => 이를 "의존성 주입"이라고 함
//  => 영어로는 "Dependency-Injection", 줄여서 DI
//  => 이 역할을 대신 해주는 Nestjs 기능 : IoC 컨테이너 (알아서 new 해서 넣어주는 애. 즉, IoC("Inversion Of control")가 DI 해줌)

// 3. "의존성 주입"으로 "싱글톤패턴" 구현 가능해짐
//  => Q) "의존성 주입"이면, "싱글톤패턴"인가?
//  => A) 그건 아님! 싱글톤패턴 = 하나의 서비스를 하나의 변수로만 선언해서 사용하는 것!?
const productService = new ProductService();
const cashService = new CashService();
const pointService = new PointService();

// 상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
// 함수 일단 실행되지 않게 ()는 빼고 작성 buyProduct 실행은 API요청이 들어왔을 때 해야하기 때문에 연결만 해줌
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon);

// 게시판 API
// app.get("/boards/...")
app.listen(3000);

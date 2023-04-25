import { userModel } from "../../models/user.model.js";
import { tokenModel } from "../../models/token.model.js";

import { createOg } from "../../scraping.js";

export class UserService {
  // 1 . 토큰db에 전화번호가 저장되어 있는지 확인
  checkUserPhone = async ({ userPhone }) => {
    const phoneResult = await tokenModel.findOne({ phone: userPhone });
    return phoneResult; // true면 인증번호 수신완료 false면 수신 미완료
  };
  // 2. 유저 db에 전화번호가 저장되어 있는지 확인 (기존회원인지 확인)
  checkUserExist = async ({ userPhone }) => {
    const personalResult = await userModel.findOne({ phone: userPhone });
    return personalResult; // true면 기존회원 false면 신규
  };

  // 3. 유저 db에 인증완료 되어있는지 확인
  checkTokenTrue = async ({ userPhone }) => {
    const phoneResult = await tokenModel.findOne({ phone: userPhone });
    return phoneResult.isAuth; // true면 인증완료 false면 인증미완료
  };
  // 4. OG 가져오기
  getOg = async ({ userPrefer }) => {
    const OG = await createOg({ userPrefer });
    return OG;
    // 이 부분 해결 안됨.. then 안쓸거임
  };

  // 유저 목록 조회 API
  searchUser = async () => {
    const result = await userModel.find();
    return result;
  };
}

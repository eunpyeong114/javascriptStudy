import { UserService } from "./services/user.service.js";
import { sendTemplateToEmail } from "../email.js";
import { protectPersonal } from "../personal.js";
import { userModel } from "../models/user.model.js";
export class UserController {
  // 회원가입 API
  userJoin = async (req, res) => {
    const userPwd = req.body.Pwd;
    const userPrefer = req.body.prefer;
    const userName = req.body.name;
    const userPhone = req.body.phone;
    const userPersonal = req.body.personal;
    const userEmail = req.body.email;
    const userService = new UserService();
    // 1 . 토큰db에 전화번호가 저장되어 있는지 확인
    const isValidPhone = await userService.checkUserPhone({
      userPhone,
    });
    // 2. 유저 db에 전화번호가 저장되어 있는지 확인 (기존회원인지 확인)
    const hasInformation = await userService.checkUserExist({
      userPhone,
    });
    // 3. 유저 db에 인증완료 되어있는지 확인
    const isValidToken = await userService.checkTokenTrue({
      userPhone,
    });

    // 4. OG가져와서 응답 보내기
    if (!isValidPhone || !isValidToken) {
      res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
    } else if (hasInformation) {
      res.status(400).send("가입된 정보가 존재합니다.");
    } else if (isValidToken && !hasInformation) {
      const ogResult = await userService.getOg({
        userPrefer,
      });
      const user = await new userModel({
        name: userName,
        email: userEmail,
        personal: protectPersonal(userPersonal), // 주민등록번호 검증 및 뒷자리 마킹
        prefer: userPrefer,
        pwd: userPwd,
        phone: userPhone,
        og: ogResult,
      });
      await user.save();
      // 회원가입 템플릿 전송
      sendTemplateToEmail({ userName, userEmail, userPhone });
      await res.send(isValidPhone._id);
    }
  };
  // 전체 목록 조회
  userSearch = async (req, res) => {
    const userService = new UserService();
    const allUserSearch = await userService.searchUser(req, res);
    res.send(allUserSearch);
  };
}

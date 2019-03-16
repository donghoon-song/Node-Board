const local = require("./localStrategy");

const { User } = require("../models");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    // req.session 객체에 어떤 데이터를 저장할지 선택
    done(null, user.id); // 첫 번째 인자는 에러 발생 시 사용. 두 번째 인자로 사용자 아이디만 저장(사용자 정보 모두 저장하면 용량 너무 커짐)
  });

  passport.deserializeUser((id, done) => {
    // 매 요청마다 passport.session() 미들웨어가 실행
    User.find({ where: id })
      .then(user => done(null, user)) // 조회한 정보를 req.user에 저장, 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴.
      .catch(err => done(err));
  });

  local(passport);
};

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Member = require("../models/member");
const asyncHandler = require("express-async-handler"); // try/ catch 대신 사용하기 위해
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const checkLogin = (req, res, next) => {
    const token = req.cookies.token; // 쿠키 정보 가져오기
    console.log("token : " + token);

    if(!token) {
        return res.redirect("/");
    };
    // 토큰이 있다면 토큰을 확인하고 사용자 정보를 요청에 추가하기
    try{
        const decoded = jwt.verify(token, jwtSecret); // 토큰 해석하기
        req.email = decoded.email;
        console.log(decoded);
        next();
    }
    catch(error) {
        return res.redirect("/");
    }
};

router.get("/", (req, res) => {
    res.render("home");
})

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // 사용자 이메일으로 사용자 찾기
    const member = await Member.findOne({ email });
    // 일치하는 사용자가 없으면 다른페이지
    if(!member) {
        return res.render("login1");
    }
    // 입력한 비밀번호와 DB에 저장된 비밀번호 비교
    const bcryptPassword = await bcrypt.compare(password, member.password);
    // 비밀번호가 일치하지 않으면 다른페이지
    if(!bcryptPassword) {
        return res.render("login1");
    }
    // JWT 토큰 생성
    const token = jwt.sign({ email: member.email }, jwtSecret);

    // 토큰을 쿠키에 저장
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/join2");
    })
);


router.get("/join", (req, res) => {
    const locals = {
        title: "회원가입2",
    };
    res.render("join2", locals);
});

// router.get("auth", checkLogin, asyncHandler(async (req, res) => {
//     res.render("auth");
// }));
router.get("/auth", checkLogin, asyncHandler(async (req, res) => {
    res.render("auth");
}));

router.get("/logout", (req, res) => {
    res.clearCookie('token');

    res.redirect('/');
});

module.exports = router;

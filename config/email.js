require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();

const stmpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.NAVER_ID,
        pass: process.env.NAVER_PASSWORD
    },
    tls: {
        rejectUnauthorized: true
    }
});

let randomNumber = function() {
    // 100000에서 999999까지의 랜덤한 정수 생성
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString(); // 문자열로 변환하여 반환
}

router.get('/check-emailSend/:email', async (req, res) => {
    const email = req.params.email;
    const random = randomNumber();
    const emailOptions = {
        from: "kgs960209@naver.com", // 발신자 이메일
        to: email, // 사용자가 입력한 이메일 => 발송 할 이메일
        subject: "인증 관련 메일 입니다.",
        text: "인증 코드: " + random
    }
    stmpTransport.sendMail(emailOptions, (err, emailOptions) => {
        console.log("response", emailOptions);
        // 첫번째 인자는 위에 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수
        if(err) {
            console.error("Error sending email:", err);
            console.log('메일 전송에 실패했습니다.');
            res.json({ send: false });
            stmpTransport.close(); // 전송종료
        }
        else {
            console.log('메일이 성공적으로 전송되었습니다.');
            res.json({ send: true, random:  random });
            stmpTransport.close(); // 전송종료
        }
    });
});

module.exports = router;
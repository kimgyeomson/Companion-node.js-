const mongoose = require("mongoose");
const asynchandler = require("express-async-handler");
require("dotenv").config(); // .env 파일의 변수를 사용하기 위해 선언

const connectDB = asynchandler(async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DB connected: ${connect.connection.host}`) // DB 연결 성공 시 터미널에 출력
})
// await : 비동기 코드를 동기적으로 처리할때 쓰는 키워드, ㄴ
// 주로 async함수 내부에서 사용되며, Promise가 처리 될때 까지 기다리고 결과 반환
module.exports = connectDB;
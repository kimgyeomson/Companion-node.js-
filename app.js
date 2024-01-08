require("dotenv").config(); // .env에 있는 변수 가져오기
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const connectDB = require("./config/MongoDB");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000; // .env에 PORT가 없으면 3000번 포트 사용

connectDB(); // DB 연결

//레이아웃과 뷰 엔진 설정
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", false);


// 정적 파일
app.use(express.static("public"));

// JSON, HTML폼 JavaScript 객체로 변환
app.use(express.json()); // JSON 데이터 JavaScript 객체로 변환
app.use(express.urlencoded({ extended: true })); // HTML폼에서 전송된 데이터를 파싱 후 JavaScript 객체로 변환
app.use(cookieParser());


app.use("/", require("./routes/login"));
app.use("/", require("./routes/axios"));
app.use("/", require("./config/email"));

app.listen(port, () => {
    console.log(`서버 실행 중 포트번호 : ${port}`)
}); 


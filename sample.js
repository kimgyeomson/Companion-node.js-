const mongoose = require("mongoose");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

// 데이터베이스 연결
const connectDB = expressAsyncHandler(async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`DB connected: ${connection.connection.host}`);

  // 연결이 설정된 후 insertData 함수 호출
  await insertData();
});

// 데이터 추가 함수
async function insertData() {
  // 기존 mongoose 연결을 사용하여 데이터베이스에 액세스
  const db = mongoose.connection;

  // 데이터베이스 선택
  const dbName = "Companion";
  db.useDb(dbName);

  // 컬렉션 선택
  const collection = db.collection("member");

  // 추가할 데이터
  const data = {
    email: "john.doe@example.com",
    password: "asd",
    name: "김겸손",
    nickname: "SSon",
    birth: 1992,
  };

  // 데이터 추가
  const result = await collection.insertOne(data);

  console.log(`Inserted ${result.insertedCount} document into the collection`);
}

// 연결
connectDB();

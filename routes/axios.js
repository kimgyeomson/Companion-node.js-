const express = require('express');
const router = express.Router();
// const axios = require('axios');
const Member = require('../models/member')
const bcrypt = require('bcrypt');
  
  
// router.get('/getData', async (req, res) => {
//     res.json({ name: "Kim" });
//   });

router.get('/check-email/:email', async (req, res) => {
  const email = req.params.email;
  console.log("router.get('/check-email/:email)' : " + email);
  const data = await Member.findOne({ email: email });
  if(!data) {
    console.log("아이디없음");
    res.json({ duplicate: true });
  }
  else {
    console.log("아이디있음");
    res.json({ duplicate: false });
  }
});

router.post("/join_add", async (req, res) => {
  //form 데이터 객체 저장
  console.log("req body : " +req.body);
  const { email, password, nickname, birthday } = req.body;
  console.log("email : " + email);
  console.log("nickname : " + nickname);
  console.log("birthday : " + birthday);
  const birth = parseInt(birthday);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("password : " + hashedPassword);
  // mongoDB 데이터 추가
  const member = new Member({ email, password: hashedPassword, nickname, birth });
  await member.save();

});



module.exports = router;

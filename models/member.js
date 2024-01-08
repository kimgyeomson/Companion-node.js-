const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    birth: {
        type: Number,
        required: true,
    },
});

// 스키마를 모델로 변환 후 내보내기
module.exports = mongoose.model("Member", memberSchema);
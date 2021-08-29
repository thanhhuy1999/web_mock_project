let { User } = require("../models/user");
let bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const req = require("express/lib/request");
let jwtSecretKey = require('./config/config')

let findUser = async (body) => {
    return await User.findOne({
        where: {
            username: body.username,
        },
    });
}

let register = async (body) => {
    let user = await findUser(body);
    if (user !== null) {
        return false;     //Kiểm tra xem user đã được sử dụng chưa
    }

    bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(body.password, salt, async (err, hash) => { //Mã hóa mật khẩu trước khi lưu vào db
            if (err) { return next(err); }
            await User.create({
                username: body.username,
                role: "customer",
                password: hash,
            });
        })
    })
    return true;
}

let signIn = async (req) => {
    let user = await findUser(req.body);
    if (user === null) {
        return {
            success: false,
            message: "false",
            token: ""
        }
    }
    let compare = bcryptjs.compare(req.body.password, user.password);
    if (!compare) {
        return {
            success: false,
            message: "false",
            token: ""
        }
    }
    let token = jwt.sign({
        role: user.role,
        account: user.username
    },jwtSecretKey);
    return {
        success: true,
        message: "Authentication successful!",
        token: token
    };
}

module.exports = {
    register,
    signIn
};
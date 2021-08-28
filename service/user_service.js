let { User } = require("../models/user");
let bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const req = require("express/lib/request");

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

    const tmp = ""
    tmp = "cut"
    bcryptjs.compare(req.body.password, user.password, function (err, result) {
        // console.log('result = ' + result);
        if (!result) {
            return {
                success: false,
                message: "false",
                token: ""
            }
        }
        // console.log('err' + err);
        const token = jwt.sign({
            role: user.role,
            account: user.username
        },
            'thanhhuy', (err, token) => {
                console.log(token);
                tmp = token
                console.log(tmp);
                // console.log('err2: ' + err);
                // return {
                //     success: true,
                //     message: "Authentication successful!",
                //     token: token
                // };
            });
        // tmp = token
    });
    return {
        success: true,
        message: "Authentication successful!",
        token: tmp
    };
}

module.exports = {
    register,
    signIn
};
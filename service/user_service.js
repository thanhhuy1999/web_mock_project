let { User } = require("../models/user");
let bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const req = require("express/lib/request");
let jwtSecretKey = require('../config/config')

/********************************************************************************************************************
 * Function: findUser()
 * Description: create findUser return user which find by username from body
 * It's a function to use later
*******************************************************************************************************************/

let findUser = async (body) => {
    return await User.findOne({
        where: {
            username: body.username,
        },
    });
}

/********************************************************************************************************************
 * Function: register()
 * Description: execute some mission: check used user -> user haven't used before -> create a new user
 *                      -> hash password to save a database, init role is customer                    
 * It's a function to use when recieve data from controller
*******************************************************************************************************************/

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


/********************************************************************************************************************
 * Function: signIn()
 * Description: execute some mission: check user from body of request -> if user was register -> check password
 *                      -> password is correct -> return a notice and a token which expired after 60 second                 
 * It's a function to use when recieve data from controller
*******************************************************************************************************************/
let signIn = async (req) => {
    let user = await findUser(req.body);
    //check user has been used
    if (user === null) {
        return {
            success: false,
            message: "UserName undefined",
            token: ""
        }
    }

    // check password
    let compare = bcryptjs.compare(req.body.password, user.password);
    if (!compare) {
        return {
            success: false,
            message: "Password is incorrect",
            token: ""
        }
    }

    //create token by data received from controller
    let token = jwt.sign({
        role: user.role,
        account: user.username
    }, jwtSecretKey,
        { expiresIn: 60 }
    );
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



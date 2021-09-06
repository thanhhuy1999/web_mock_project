let express = require("express");
let userRouter = new express.Router();
let { register, signIn } = require("../service/user_service");
let { registerValidator, loginValidator } = require("../service/user_validator");


/********************************************************************************************************************
 * Method: POST
 * Router: /user/register
 * Description:  when user access to api /user/register, firstly, it will check validator of user
 *              If user is validator -> send notice -> or not, allow register -> check user has been used before            
*******************************************************************************************************************/
userRouter.post("/register", async (req, res) => {
    try {
        let validator = await registerValidator(req);
        if (validator !== null) {
            return res.send({ message: validator });
        } else {
            let registed = await register(req.body);
            if (registed == true) {
                return res.send({ message: "Register successfully." });
            } else {
                return res.send({ message: "User has been used." });
            }
        }
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
});

/********************************************************************************************************************
 * Method: POST
 * Router: /user/login
 * Description:  when user access to api /user/login, send data from request for signIn function of user_service
 *              -> if success false, send to user a notice -> if success true, allow login for user
 *                 If have error, send a notice Server error    
*******************************************************************************************************************/
userRouter.post("/login", async (req, res) => {
    try {
        let signIned = await signIn(req)
        // console.log(signIned);
        if (signIned.success === false) {
            return res.send({ message: "User or Password is incorrect" });
        } else {
            return res.send({
                success: true,
                message: "Login successfully",
                data: signIned
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server Error" });
    }
});

module.exports = userRouter;
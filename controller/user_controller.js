let express = require("express");
let userRouter = new express.Router();
let { register, signIn } = require("../service/user_service");
let { registerValidator, loginValidator } = require("../service/user_validator");

userRouter.post("/", async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
    try {
        let signIned = await signIn(req)
        console.log(signIned);
        if (signIned.success === false) {
            return res.send({ message: "Email or Password is incorrect" });
        } else {
            return res.send({
                success: true,
                message: "login successfully",
                data: signIned
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server Error" });
    }
});

module.exports = userRouter;
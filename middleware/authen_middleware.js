const jwt = require('jsonwebtoken');
let jwtSecretKey = require('../config/config')

/*****************************************************************************************************
 * Function name: checkAuth
 * Description: receive token from client and check, if token is verfy -> allow client access to api
 * 
 * *****************************************************************************************************/

const checkAuth = (req, res, next) => {
    // receive toke from request of header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });

    try {
        // decode token
        const decodedToken = jwt.verify(token, jwtSecretKey);
        // req.userRole = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' });
    }
}

function checkAdmin(req, res, next) {
    if (req.userRole.role === 1) {
        next();
    }
    else {
        res
            .status(405)
            .json("Not permission!!!")
    }
}
function checkUser(req, res, next) {
    if (req.userRole.role === 0) {
        next();
    }
    else {
        res
            .status(405)
            .json("Not permission!")
    }
}

//function checklogedin()

module.exports = {
    checkAuth: checkAuth,
    checkAdmin: checkAdmin,
    checkUser: checkUser,
}
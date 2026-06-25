const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "token not found"
        })
    }
    try {
        const decode = jwt.verify(token, process.env.jwt_secrete)
        req.user = decode
        next()
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

module.exports=auth
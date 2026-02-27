// controller or api ke beech ek layer hoti hai middleware ki jiska kaam hota hai req ko process krna aur usme se kuch data nikalna ya modify krna aur phir aage forward krna


const jwt = require('jsonwebtoken')
async function identifyUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded

    next() // aange forward krdo req
}

module.exports = identifyUser 
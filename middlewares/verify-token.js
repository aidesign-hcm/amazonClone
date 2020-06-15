const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.SECRETJSON);
//         req.userData = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// };

module.exports = function(req, res, next){
    let token = req.headers['x-access-token'] || req.headers.authorization;
    let checkBearer = "Bearer ";
    if (token.startsWith(checkBearer)){
        token = token.slice(checkBearer.length, token.length)
    };
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.SECRETJSON, (err, decoded) => {
            if(err){
                res.json({
                    success: false,
                    meassage: 'failed authentication'
                })
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        res.json({
            success:false,
            message: "token not provied"
        })
    }
}
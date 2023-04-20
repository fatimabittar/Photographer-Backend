import Jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password') //it will not include the pasword by this 

            next()
        }
        catch (error) {
            console.log(error)
            res.status(401).json({ message: `Not Authorized` })
        }
    }

    if (!token) {
        res.status(401).json({ message: `Not Authorized, No Token` })
    }
}

// const checkRole = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Not authorized' });
//         }
//         next();
//     };
// }



export default protect;
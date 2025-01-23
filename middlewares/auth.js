import {TokenService} from "../services/token.js";

export const validateAuth = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) return res.status(401).json({message: 'No token provided'})

    token = token.split(' ')[1]

    try {
        req.user_id = await TokenService.verifyAccessToken(token)
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'})
    }
}
import jwt from 'jsonwebtoken'

export const validateAuth = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) return res.status(401).json({message: 'No token provided'})

    token = token.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!payload) return res.status(401).json({message: 'Invalid token'})

        req.user_id = payload.user_id
        next()
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'})
    }
}
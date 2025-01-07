import jwt from 'jsonwebtoken'

export const validateAuth = (req, res, next) => {
    let token = req.headers.authorization

    if (!token) return res.status(401).json({message: 'No token provided'})

    token = token.split(' ')[0]

    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET)

        if (!isValid) return res.status(401).json({message: 'Invalid token'})

        next()
    }
    catch (err) {
        return res.status(400).json({message: 'Invalid token'})
    }
}
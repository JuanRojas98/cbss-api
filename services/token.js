import jwt from 'jsonwebtoken'
    const jwt_secret_key = process.env.JWT_SECRET_KEY

export class TokenService {
    static async getAccessToken(user_id) {
        return new Promise((resolve,reject)=>{
            jwt.sign(
                { user_id },
                jwt_secret_key,
                {
                    expiresIn: '10min'
                },
                (err, token) => {
                    if(err) reject(err)
                    resolve(token)
                }
            )
        })
    }

    static async getRefreshToken(user_id) {
        return new Promise((resolve,reject)=>{
            jwt.sign(
                { user_id },
                jwt_secret_key,
                {
                    expiresIn: '1d'
                },
                (err, token) => {
                    if(err) reject(err)
                    resolve(token)
                }
            )
        })
    }

    static async verifyAccessToken(accessToken) {
        return new Promise((resolve,reject)=>{
            jwt.verify(accessToken, jwt_secret_key,(err,decode)=>{
                if(err) reject(err)
                resolve(decode.user_id)
            })
        })
    }

    static async verifyRefreshToken(refreshToken) {
        return new Promise((resolve,reject)=>{
            jwt.verify(refreshToken, jwt_secret_key,(err,decode)=>{
                if(err) reject(err)
                resolve(decode.user_id)
            })
        })
    }
}
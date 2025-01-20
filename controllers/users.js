import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {UserModel} from '../models/user.js'
import {validateUser, validatePartialUser} from "../schemas/users.js";

export class UsersController {
    static async getUsers(req, res) {
        const users = await UserModel.getUsers()
        res.json(users)
    }

    static async getUser(req, res) {
        const {id} = req.params

        const {user} = await UserModel.getUserById({id})
        if (!user) res.status(404).json({message: 'User not found'})
        res.json(user)
    }

    static async registerUser(req, res) {
        const valid = validateUser(req.body)

        if (!valid.success) return res.status(422).json({message: valid.error.message})

        const {name, email, password} = req.body
        const user = await UserModel.getUserByEmail({email})

        if (user) return res.status(400).json({message: 'User already exists'})

        const passwordHased = await bcryptjs.hash(password, 10);
        valid.data.password = passwordHased;

        const createUser = await UserModel.createUser({body: valid.data})
        res.status(201).json({message: 'User has been created', user_id: createUser})
    }

    static async updateUser(req, res) {
        const valid = validatePartialUser(req.body)

        if (!valid.success) return res.status(422).json({message: valid.error.message})

        const {id} = req.params
        const updateUser = await UserModel.updateUser({id, body: req.body})
        res.status(201).json({message: 'User updated successfully'})
    }

    static async login(req, res) {
        const {email, password} = req.body
        const user = await UserModel.getUserByEmail({email})

        if (!user) return res.status(404).json({message: 'User not found'})

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) return res.status(401).json({message: 'Password invalid'})

        const access_token = jwt.sign(
            {
                user_id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10min'
            }
        )
        const refresh_token = jwt.sign(
            {
                user_id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )

        return res.status(200).json({access_token, refresh_token})
    }

    static async refreshToken(req, res) {
        const {oldToken} = req.body

        if (oldToken) res.status(400).json({message: 'No token provided'})

        const {user_id} = jwt.verify(oldToken, process.env.JWT_SECRET_KEY)
        const user = await UserModel.getUserById({user_id})

        if (!user) return res.status(404).json({message: 'User not found'})

        const access_token = jwt.sign(
            {
                user_id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10min'
            }
        )
        const refresh_token = jwt.sign(
            {
                user_id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )

        return res.status(200).json({access_token, refresh_token})
    }
}
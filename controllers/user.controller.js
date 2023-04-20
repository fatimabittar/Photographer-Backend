import User from "../models/user.model.js"
import Jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';


//Generate Token (JWT)

const generateToken = (id) => {
    return Jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

class Controller {

    //Register

    async registerUser(req, res) {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            res.status(400).json({ message: `please add all fields` })
        }

        //check if user exists
        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).json({ message: `User already Exist` })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        //check if user created
        if (user) {
            res.status(201).json({
                message: `User Created Successfully`,
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })

        }
        else {
            res.status(400).json({ message: `Invalid User Data` })
        }

    }


    //login

    async loginUser(req, res) {
        const { email, password } = req.body

        //check for user email
        const user = await User.findOne({ email })

        //check password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                message: `Loged In Successfully`,
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        }

        else {
            res.status(400).json({ message: `Invalid Credentials` })
        }

    }

    //Get users
    //since iam getting req.user from middleware so whenever iam authorized i can get any info of user that logged in or just been authorized to enter ,and this is an example
    async getMe(req, res) {

        // const { _id, username, email } = await User.findById(req.user.id)
        const user = await User.find()

        res.status(200).json({
            id: _id,
            username,
            email
        })
    }





}
const controller = new Controller()
export default controller;
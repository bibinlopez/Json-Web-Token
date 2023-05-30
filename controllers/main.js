const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')
const login = async (req, res) => {
   const { username, password } = req.body
   // console.log(username, password);
   if (!username || !password) {
      throw new CustomAPIError('Please provide username and email', 400)
   }

   const id = new Date().getDate()


   const token = jwt.sign({ id, username }, process.env.JWT, { expiresIn: '30d' })
   res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
   const authHeader = req.headers.authorization
   // console.log(authHeader);
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomAPIError('No token provided', 400)
   }
   const token = authHeader.split(' ')[1]
   // console.log(token);
   try {
      const decoded = jwt.verify(token, 'jwtsecret')
      // console.log(decoded);
      const { username } = decoded
      req.user = username
   } catch (error) {
      throw new CustomAPIError('invalid token', 401)
   }

   // const  username= req.user
   // console.log(username);
   const luckyNumber = Math.floor(10 + Math.random() * 90)
   res.status(200).json({ msg: `Hello ${req.user}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
   login,
   dashboard
}
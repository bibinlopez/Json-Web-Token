const jwt = require('jsonwebtoken');

const login = async (req, res) => {
   const { username, password } = req.body
   // console.log(username, password);
   const token = jwt.sign({ username }, process.env.JWT, { expiresIn: '30d' })
   return res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
   const authHeader = req.headers.authorization
   // console.log(authHeader);
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomAPIError('No token provided', 400)
   }
   const token = authHeader.split(' ')[1]
   console.log(token);
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
   res.status(200).json({ msg: `Hi ${req.user} your lucky number is ${luckyNumber}` })
}

module.exports = {
   login,
   dashboard
}
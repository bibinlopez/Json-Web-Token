const jwt = require('jsonwebtoken');

const login = async (req, res) => {
   const { username, password } = req.body
   // console.log(username, password);
   const token = jwt.sign({ username }, process.env.JWT, { expiresIn: '30d' })
   return res.status(200).json({ msg: 'user created', token })
}



module.exports = {
   login
}
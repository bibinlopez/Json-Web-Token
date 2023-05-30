const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');


const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization
   // console.log(authHeader);
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('No token provided')
   }
   const token = authHeader.split(' ')[1]
   // console.log(token);
   try {
      const decoded = jwt.verify(token, process.env.JWT)
      // console.log(decoded);
      const { username } = decoded
      req.user = username
   } catch (error) {
      throw new UnauthenticatedError('Not authorized to access this route')
   }
   next()
}

module.exports = authMiddleware
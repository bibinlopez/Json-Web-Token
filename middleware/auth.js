const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization
   // console.log(authHeader);
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomAPIError('No token provided', 400)
   }
   const token = authHeader.split(' ')[1]
   console.log(token);
   try {
      const decoded = jwt.verify(token, process.env.JWT)
      // console.log(decoded);
      const { username } = decoded
      req.user = username
   } catch (error) {
      throw new CustomAPIError('Not authorized to access this route', 401)
   }
   next()
}

module.exports = authMiddleware
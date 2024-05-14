const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Function to generate a new JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '4h' });
};



const jwtMiddleware = async (ctx, next) => {
  try {
    // Get the token from the cookies
    const token = ctx.cookies.get('token');
    if (!token) throw new Error('No token');

    // Verify the token
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error('Token is invalid');

    // Attach user info to the context
    ctx.state.user = decoded;
    console.log(ctx.state.user);
    // Call the next middleware
    await next();
  } catch (err) {
    ctx.status = 401; // Unauthorized
    ctx.body = { message: 'Authentication error. Token required.' };
  }
};

module.exports = { generateToken, jwtMiddleware };

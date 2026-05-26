import jwt from "jsonwebtoken";

/**
 * Authentication middleware that validates JWT tokens.
 * Supports tokens provided via cookies ("token") or the Authorization header ("Bearer <token>").
 * Upon successful verification, it attaches the decoded user ID to `req.id` for downstream handlers.
 */
const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookie or Authorization header
    let token = req.cookies?.token;
    if (!token && req.headers?.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify token synchronously (jwt.verify can be used sync)
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token, please provide a valid token",
        success: false,
      });
    }

    // Attach user identifier to request for controllers
    req.id = decoded.userId || decoded.id || decoded.sub;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
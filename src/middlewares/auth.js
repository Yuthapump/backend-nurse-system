const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    console.log("roleMiddleware check:", req.user?.role);
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  roleMiddleware,
};

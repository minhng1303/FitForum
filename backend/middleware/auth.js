const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(403).send({ message: "Bad Credentials" });
  }
  try {
    let token = authorization.replace("Bearer ", "");
    // token = token.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id, token: token });
    if (!user) {
      return res.status(403).send({ message: "Bad Credentials" });
    }
    req.user = user;
    req.token = token;
    console.log("Inside Auth Middleware");
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;

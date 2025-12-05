import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  // const token = req.header("x-auth-token");

  try {
    // check the validity of jwt
    // jwt.verify(token, process.env.JWT_SECRET);
    jwt.verify(req.cookies.JWT, process.env.JWT_SECRET)
    next();
  } catch (error) {
    // token not valid
    res.status(401).send();
  }
};

export default checkToken;

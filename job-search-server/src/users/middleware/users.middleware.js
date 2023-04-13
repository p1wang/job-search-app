import jwt from "jsonwebtoken";

class UsersMiddleware {
  async auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ error: "Unauthorized" });
    } else {
      const token = authHeader.split(" ")[1];

      // verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).send({ error: "Unauthorized" });
      }
    }
  }
}

export default new UsersMiddleware();

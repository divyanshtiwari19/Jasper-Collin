const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  try {
    console.log(req.session, "req.session")
    if (!req.session || !req.session.token)
      return res.status(401).send({ error: "Not authorized." });

    // Verify JWT token
    jwt.verify(req.session.token, process.env.JWT_SECRET, (err, userDetail) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Session expired, please log in again" });
      }

      req.user = userDetail;
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Something Broke!" });
  }
};

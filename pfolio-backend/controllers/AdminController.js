import jwt from "jsonwebtoken";

function createToken() {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
}

export const login = async (req, res) => {
  try {
    const isValid =
      req.body.username == process.env.ADMIN_U &&
      req.body.password == process.env.ADMIN_P;

    if (!isValid) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const token = createToken();

    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Authorization failed!" });
  }
};

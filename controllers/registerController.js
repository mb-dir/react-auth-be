const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const isNameDuplicated = await User.findOne({ username: user }).exec();
  if (isNameDuplicated) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 8);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    res.status(201).json({ success: "New user created!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { handleNewUser };

const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.jwt;
  if (!refreshToken) return res.sendStatus(204);


  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt',{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();



  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);

};

module.exports = { handleLogout };

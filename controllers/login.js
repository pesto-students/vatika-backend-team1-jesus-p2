const sendEmail = require("../utils/sendEmail");

const { queryByEmail, comparePassword } = require("../services/LoginTable");
const { findToken, newToken } = require("../services/TokenTable");

const loginUser = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    const user = await queryByEmail(userEmail);
    if (!user) return res.status(401).send({ message: "User with this Email Does not Exists" });

    const validPassword = await comparePassword(userPassword, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    if (!user.verified) {
      let token = await findToken(user._id);
      if (!token) {
        token = await newToken(user._id);
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ token: token, message: "logged in successfully",userId:user._id });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
};

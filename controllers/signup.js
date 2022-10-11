const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const {
  queryByEmail,
  addNewUser,
  queryByUserId,
  updateUser,
} = require("../services/SignupTable");
const { newToken, findTokenByToken } = require("../services/TokenTable");

const createNewUser = async (req, res) => {
  const uName = req.body.userName;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    let user = await queryByEmail(userEmail);
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(userPassword, salt);

    user = await addNewUser(uName, userEmail, hashPassword);

    const token = await newToken(user._id);

    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await queryByUserId(userId);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await findTokenByToken(user._id, req.params.token);

    if (!token) return res.status(400).send({ message: "Invalid link" });

    await updateUser(userId);
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createNewUser,
  verifyUser,
};

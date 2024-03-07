const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authService.registerUser(userData);
    res.status(201).json({
      message: "User Registered Successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
module.exports = {
  register,
};

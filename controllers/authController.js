const User = require("../models/use");
exports.signUp = async (req, res) => {
  try {
    const newU = await User.create(req.body);
    req.session.user = newU;
    res.status(201).json({
      status: "success",
      data: {
        user: newU,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    if (password != user.password) {
      req.session.user = user;
      return res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
    return res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

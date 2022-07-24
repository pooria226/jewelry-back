module.exports.isUser = (req, res, next) => {
  try {
    if (req?.user?.role == "user") return next();
    return res
      .status(401)
      .json({ success: false, error: "شما به این قسمت دسترسی ندارید" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "شما به این قسمت دسترسی ندارید" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  try {
    if (req?.user?.role == "admin") return next();
    return res
      .status(401)
      .json({ success: false, error: "شما به این قسمت دسترسی ندارید" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "شما به این قسمت دسترسی ندارید" });
  }
};

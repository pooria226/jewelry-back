const Payment = require("../Model/Payment");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 10;
  try {
    console.log("await Payment.find()", await Payment.find());
    const payments = await Payment.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ create_at: 1 });
    const payment_count = await (await Payment.find()).length;
    const pages = Math.ceil(payment_count / perPage);
    res.status(200).json({
      data: { payments, pages, count: payment_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

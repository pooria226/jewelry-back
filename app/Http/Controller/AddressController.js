const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/addresValidator");
const Address = require("../Model/Address");

module.exports.all = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.store = async (req, res) => {
  try {
    const {
      postal_address,
      province,
      city,
      plaque,
      postal_code,
      unit,
      recipient_name,
      recipient_lastname,
      recipient_phone,
    } = req.body;
    const errors = storeValidator(req.body);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dup_address = await Address.findOne({ postal_code });
    if (dup_address)
      return res.status(400).json({
        success: false,
        errors: [
          {
            key: "postal_code",
            message: "ادرسی با این کد پستی دخیر شده است",
          },
        ],
      });
    await Address.create({
      postal_address,
      province,
      city,
      plaque,
      postal_code,
      unit,
      recipient_name,
      recipient_lastname,
      recipient_phone,
      user: req.user.id,
    });
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const address = await Address.findOne({ id });
    res.status(200).json({ data: address, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      postal_address,
      province,
      city,
      plaque,
      postal_code,
      unit,
      recipient_name,
      recipient_lastname,
      recipient_phone,
    } = req.body;
    const errors = updateValidator({ ...req.body, id: id });
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    const dup_address = Address.findOne({ postal_code });
    if (dup_address)
      return res.status(400).json({
        success: false,
        errors: [
          {
            key: "postal_code",
            message: "ادرسی با این کد پستی دخیر شده است",
          },
        ],
      });
    await Address.findOneAndUpdate(
      id,
      {
        postal_address,
        province,
        city,
        plaque,
        postal_code,
        unit,
        recipient_name,
        recipient_lastname,
        recipient_phone,
        user: req.user.id,
      },
      { omitUndefined: true, new: true }
    );
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = deleteValidator(req.params);
    if (errors.length > 0)
      return res.status(400).json({ success: false, errors: errors });
    await Address.findByIdAndRemove(id);
    res.status(200).json({ message: "با موفقیت انجام شد", success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

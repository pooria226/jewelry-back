const { upload } = require("../../middleware/multer");
const { isEmpty } = require("lodash");
const {
  storeValidator,
  showValidator,
  updateValidator,
  deleteValidator,
} = require("../../validator/blogValidator");
const Blog = require("../Model/Blog");

module.exports.all = async (req, res) => {
  const { page } = req.params;
  const perPage = 10;
  try {
    const blogs = await Blog.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate({ path: "tags", select: "id title" })
      .populate({ path: "categories" })
      .sort({ create_at: 1 });
    const blogs_count = await (await Blog.find()).length;
    const pages = Math.ceil(blogs_count / perPage);
    res.status(200).json({
      data: { blogs, pages, count: blogs_count },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

module.exports.store = async (req, res) => {
  try {
    upload.uploadImageBlog(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              key: "avatar",
              message: " فایل باید با /jpeg|jpg|png|svg/ این پسوند ها باشد",
            },
          ],
        });
      } else {
        const { title, slug, content, tags, categories, author } = req.body;
        const errors = storeValidator(req.body);
        if (errors.length > 0)
          return res.status(200).json({ errors: errors, success: false });
        const dup_blog = await Blog.findOne({ title });
        if (dup_blog)
          return res.status(200).json({
            errors: [
              { key: "title", message: "مقاله ای با این نام ثبت شده است" },
            ],
            success: false,
          });
        const origin = req.protocol + "://" + req.get("host");
        await Blog.create({
          title,
          slug,
          content,
          tags,
          categories,
          author,
          image_origin: !isEmpty(req.file)
            ? origin + "/uploads/" + req.file.filename
            : undefined,
        });
        res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = showValidator(req.params);
    if (errors.length > 0)
      return res.status(401).json({ success: false, errors: errors });
    const blog = await Blog.findById(id);
    res.status(200).json({ data: blog, success: true });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};
module.exports.update = async (req, res) => {
  try {
    upload.uploadImageBlog(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          errors: [
            {
              key: "avatar",
              message: " فایل باید با /jpeg|jpg|png|svg/ این پسوند ها باشد",
            },
          ],
        });
      } else {
        const { id } = req.params;
        const { title, slug, content, tags, categories, author } = req.body;
        console.log("tags", tags);
        const errors = updateValidator({ ...req.body, id: id });
        if (errors.length > 0)
          return res.status(401).json({ success: false, errors: errors });
        const origin = req.protocol + "://" + req.get("host");
        await Blog.findOneAndUpdate(
          id,
          {
            title,
            slug,
            content,
            tags,
            categories,
            author,
            image_origin: !isEmpty(req.file)
              ? origin + "/uploads/" + req.file.filename
              : undefined,
          },
          { omitUndefined: true, new: true }
        );
        res.status(200).json({ message: "با  موفقیت انجام شد", success: true });
      }
    });
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
    await Blog.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(400).json({ message: "مشکلی پیش امده", success: false });
  }
};

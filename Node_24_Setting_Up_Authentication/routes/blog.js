const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    // for navigation bar
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  // HERE WE ARE POPULATING THE CREATEDBY FIELD OF THE BLOG MODEL
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  // console.log("blog", blog);
  const comments = await comment
    .find({ blogId: req.params.id })
    .populate("createdBy");
  console.log("comments", comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

// /blog/comment pe post krne pe us blog ke comment me comment add krenge
router.post("/comment/:blogId", async (req, res) => {
  // adding the recieved comment to the blog model with the blogId
  // and which we will render on the blog page using an ejs file
  await comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  //  console.log(JSON.stringify(req.user) +"hello");

  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;

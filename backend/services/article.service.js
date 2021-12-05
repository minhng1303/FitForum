const Article = require("../models/article.model");
const Comment = require("../models/comment.model");
const articleService = {};

articleService.getArticles = async (req, res) => {
  // Create a new user
  try {
    const tagName = req.query.tag;
    const authorName = req.query.author;
    let articles;
    if (tagName || authorName) {
      articles = await Article.find({
        // $match: {
        $or: [{ tagList: tagName }, { "author.username": authorName }],
        // },
      }).limit(20);
    } else {
      articles = await Article.find({}).limit(20);
    }
    res
      .status(201)
      .json({ articles: articles, articlesCount: articles.length });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

articleService.getFeedArticles = async (req, res) => {
  try {
    const articles = await Article.aggregate([{ $sample: { size: 20 } }]);
    res
      .status(201)
      .json({ articles: articles, articlesCount: articles.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

articleService.getSlugArticle = async (req, res) => {
  const slug = req.params.slug;
  try {
    const article = await Article.findOne({ slug: slug });
    // const token = await user.generateToken();
    res.status(200).json({ article: article });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

articleService.createArticle = async (req, res) => {
  const { title, body, description, tagList, author } = req.body.article;
  // let author = { username: "MaxNguyen" };
  let slug = title.split(" ").join("-");
  const article = new Article({
    title: title,
    body: body,
    description: description,
    tagList: tagList,
    author: author,
    slug: slug,
  });
  const savedArticle = await article.save();
  res
    .status(201)
    .json({ article: savedArticle, message: "Create new post successful" });
};

articleService.getCommentArticle = async (req, res) => {
  let slug = req.params.slug;
  const comments = await Article.findOne({ slug: slug }).select(
    "comments -_id"
  );
  // console.log(article);
  res.status(200).json(comments);
};

articleService.addCommentArticle = async (req, res) => {
  try {
    let slug = req.params.slug;
    // console.log(slug);
    let body = req.body.comment.body;
    let comment = new Comment({
      body: body,
      author: {
        username: req.user.username,
        image: req.user.image,
      },
    });
    let savedComment = await comment.save();
    let article = await Article.findOne({ slug: slug });
    article.comments.push(savedComment);
    await article.save();
    res
      .status(201)
      .json({ comment: savedComment, message: "Comment Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

articleService.updateArticle = async (req, res) => {
  try {
    let slug = req.params.slug;
    let article = await Article.findOne({ slug: slug });
    if (article.author.username !== req.user.username) {
      return res.status(401).json({ message: "Bad Credentials" });
    }

    let updatedArticle = await Article.updateOne(
      { slug: slug },
      {
        $set: { ...req.body.article },
      }
    );
    res.json({ article: updatedArticle, message: "Update successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

articleService.deleteArticle = async (req, res) => {
  let slug = req.params.slug;
  let article = await Article.findOne({ slug: slug });
  if (article.author.username !== req.user.username) {
    return res.staus(403).json({ message: "Bad credentials" });
  }
  await Article.deleteOne({ slug: slug });
  res.status(201).json({ message: "Delete successful" });
};

articleService.deleteComment = async (req, res) => {
  try {
    let slug = req.params.slug;
    let commentId = req.params.commentId;
    let article = await Article.findOne({ slug: slug });
    article.comments = article.comments.filter((comment) => {
      return comment._id.toString() != commentId.toString();
    });
    await article.save();
    res.status(201).json({ message: "Delete comment successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

module.exports = articleService;

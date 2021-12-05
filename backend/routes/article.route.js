const express = require("express");
const articleService = require("../services/article.service");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", articleService.getArticles);

router.get("/feed", articleService.getFeedArticles);

router.get("/:slug", articleService.getSlugArticle);

router.post("/", articleService.createArticle);

router.get("/:slug/comments", articleService.getCommentArticle);

router.post("/:slug/comments", auth, articleService.addCommentArticle);

router.put("/:slug", auth, articleService.updateArticle);

router.delete("/:slug", auth, articleService.deleteArticle);

router.delete("/:slug/comments/:commentId", auth, articleService.deleteComment);

module.exports = router;

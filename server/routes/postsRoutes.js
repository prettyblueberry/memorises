import express from "express";
import { createPost, deletePost, fetchPosts, likePost, updatePost } from "../controllers/postsController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", fetchPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;

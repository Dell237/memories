import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

//setup router 
const router = express.Router();

//adding routes
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost)



export default router;
const express = require("express");
const postsController = require("../controllers/postsController");

const router = new express.Router();

// Add a new post
router.post("/", async (req, res) => {
    await postsController.Add(req, res);
});

// Show all posts
router.get("/", async (req, res) => {
    await postsController.All(req, res);
});

// Show specific post
router.get("/:_id", async (req, res) => {
    await postsController.Show(req, res);
});

// Update specific post
router.put("/:_id", async (req, res) => {
    await postsController.Update(req, res);
});

// Remove specific post
router.delete("/:_id", async (req, res) => {
    await postsController.Remove(req, res);
});

module.exports = router;
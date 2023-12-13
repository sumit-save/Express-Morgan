const postsModel = require("../models/postsModel");

module.exports.Add = async (req, res) => {
    try {
        const newPost = new postsModel({
            title: req.body.title,
            description: req.body.description
        });
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports.All = async (req, res) => {
    try {
        const allPosts = await postsModel.find();
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports.Show = async (req, res) => {
    try {
        const specificPost = await postsModel.findOne({ _id: req.params._id });
        return res.status(200).json(specificPost);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports.Update = async (req, res) => {
    try {
        const updatedPost = await postsModel.updateOne({ _id: req.params._id }, { $set: { title: req.body.title, description: req.body.description } });
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports.Remove = async (req, res) => {
    try {
        const removedPost = await postsModel.deleteOne({ _id: req.params._id });
        return res.status(200).json(removedPost);
    } catch (error) {
        return res.status(400).json(error);
    }
};

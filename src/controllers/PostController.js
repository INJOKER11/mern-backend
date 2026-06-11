import PostModel from "../models/Post.js";

export const index = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "name id")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create posts" });
  }
};

export const getRecord = async (req, res) => {
  try {
    const doc = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
    ).populate("user", "name id");

    if (!doc) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(doc);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to get post" });
  }
};

export const update = async (req, res) => {
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
      },
      {
        returnDocument: "after",
      },
    ).populate("user", "name");

    if (!post) {
      return res.status(404).json({
        message: "Failed to update post",
      });
    }
    console.log(post);

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const post = await PostModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId.toString(),
    });
    console.log(post);
    if (!post) {
      return res.status(404).json({
        message: "Failed to delete post",
      });
    }

    res.json({
      message: "Successfully deleted post",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

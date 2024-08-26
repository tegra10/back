const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");

module.exports.getPost = async (req, res) => {
  const post = await PostModel.find();
  res.status(200).json(post);
};

module.exports.setPost = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" });
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });

  res.status(200).json(post);
};

module.exports.setEdit = async (req, res) => {
  const post = await postModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "le post n'existe pas" });
  }

  const updatePost = await postModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });

  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(400).json({ message: "le post n'existe pas" });
    }

    res.status(200).json({ message: "message supprimé " + post });
  } catch (err) {
    console.log("l'erreur est " + err);
    res.status(500).json({ message: "message error" });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    await postModel
      .findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.userId } },
        { new: true }
      )
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    await postModel
      .findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.userId } },
        { new: true }
      )
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
};

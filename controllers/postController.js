const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.setPostAuthor = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  next();
};

exports.protectPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;

  const authorData = await Post.findById(postId).select("author");
  console.log("AUTHOR :-" + authorData);

  let userId = req.user._id.valueOf();
  let authorId = authorData.author._id.valueOf();
  if (userId === authorId) {
    next();
  } else {
    return next(new AppError("You dont have permission to change this post"));
  }
});

exports.reportPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const authorData = await Post.findById(postId).select("author");

  let userId = req.user._id.valueOf();
  let authorId = authorData.author._id.valueOf();

  if (userId === authorId) {
    return next(new AppError("You cant report your own Post"));
  } else {
    res.send("Reported");
  }
});

exports.getAllPosts = factory.getAll(Post);
exports.createPost = factory.createOne(Post);
exports.getOnePost = factory.getOne(Post, { path: "author" });
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.likePost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;

  const userId = req.user.id;

  const post = await Post.findById(postId).select("like");
  let likeArr = post.like;

  if (likeArr.includes(userId)) {
    likeArr = likeArr.filter(function (value, index, arr) {
      return value != userId;
    });
    const likedPost = await Post.findByIdAndUpdate(
      postId,
      {
        like: likeArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send({
      status: "Like removed",
      likedPost,
    });
  } else {
    likeArr.push(userId);
    const likedPost = await Post.findByIdAndUpdate(
      postId,
      {
        like: likeArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send({
      status: "success",
      likedPost,
    });
  }
});
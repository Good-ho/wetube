/* eslint-disable import/prefer-default-export */
import Video from "../models/Video";
import Comment from "../models/Comment";

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Comment.deleteOne({ _id: id });
    res.status(200);
    res.end();
  } catch (error) {
    res.status(400);
    res.send();
  }
};

import videoModel from "../model/video";
import userModel from "../model/user";
import commentModel from "../model/comment";
import likeModel from "../model/likes";

export const home = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" }).populate("owner").populate("likes");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // ES6 문법 const id = req.params.id 와 같다
  const { id } = req.params;
  const { user } = req.session;

  const video = await videoModel.findById(id).populate("owner").populate("comments").populate("likes");
  const users = await userModel.find().populate("comments").populate("likes");

  const likeUser = user ? video.likes.find((like) => like.owner.toString() === user._id.toString()) : null;

  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  return res.render("videos/watch", { pageTitle: video.title, video, users, likeUser });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  if (!video.owner.equals(_id)) {
    req.flash("error", "비디오 주인이 아니다");
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    file,
    body: { title, description, hashtags },
  } = req;

  const video = await videoModel.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }

  if (!video.owner.equals(_id)) {
    req.flash("error", "비디오 주인이 아니다");
    return res.status(403).redirect("/");
  }

  try {
    await videoModel.findByIdAndUpdate(
      id,
      {
        fileUrl: file ? file.path : video.fileUrl,
        title,
        description,
        hashtags: videoModel.formatHashtags(hashtags),
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return res.status(404).render("videos/edit", { pageTitle: `Editing: ${video.title}`, errorMessage: "동영상 수정 실패" });
  }
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    file: { path: fileUrl },
    body: { title, description, hashtags },
  } = req;

  try {
    const newVideo = await videoModel.create({
      title,
      description,
      owner: _id,
      fileUrl,
      hashtags: videoModel.formatHashtags(hashtags),
    });
    const user = await userModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
  } catch (error) {
    return res.status(400).render("videos/upload", { pageTitle: "upload video", errorMessage: error._message });
  }
  return res.redirect("/");
};

// export const putRecorderError = async (req, res) => {
//   // const {
//   //   body: { errorMessage },
//   // } = req;

//   return res.sendStatus(301);
// };

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (!video.owner.equals(_id)) {
    return res.status(403).redirect("/");
  }

  await videoModel.findByIdAndDelete(id);
  await userModel.findByIdAndUpdate(
    _id,
    {
      $pull: { videos: id },
    },
    { returnDocument: "after" }
  );

  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await videoModel
      .find({
        title: {
          // i는 대소문자를 구분없이 검색하게 해주는 것이다.
          // RegExp는 contains와 같다 포함하는 단어를 찾아주는 것
          $regex: new RegExp(keyword, "i"),
        },
      })
      .populate("owner");
  }
  return res.render("videos/search", { pageTitle: "search video", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
    body: { text },
  } = req;

  const video = await videoModel.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await commentModel.create({
    text,
    owner: user._id,
    video: id,
  });
  await videoModel.updateOne(
    { _id: id }, // 조건을 객체로 전달
    { $push: { comments: comment._id } }
  );

  await userModel.updateOne(
    { _id: user._id }, // 조건을 객체로 전달
    { $push: { comments: comment._id } }
  );

  const userinfo = await userModel.findById(user._id);

  return res.status(201).json({ newCommentId: comment._id, newUsername: userinfo.username });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    // body: { comId },
  } = req;

  const comment = await commentModel.findById(id);

  if (!comment) {
    return res.status(404).render("404", { pageTitle: "댓글이 없습니다." });
  }

  if (!comment.owner.equals(_id)) {
    req.flash("error", "댓글 주인이 아녀라");
    return res.status(403).redirect("/");
  }
  await commentModel.findByIdAndDelete(comment._id);
  await videoModel.findByIdAndUpdate(
    id,
    {
      $pull: { comments: comment._id },
    },
    { returnDocument: "after" }
  );
  await userModel.findByIdAndUpdate(
    _id,
    {
      $pull: { comments: comment._id },
    },
    { returnDocument: "after" }
  );
  return res.redirect(`/videos/${comment.video._id}`);
  // return res.status(200).json({ message: "삭제성공" });
};

export const registerLike = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;

  const video = await videoModel.findById(id).populate("likes");

  if (!video) {
    return res.sendStatus(404);
  }

  const existsLike = video.likes.find((like) => like.owner.toString() === user._id.toString());

  if (existsLike && existsLike.owner.toString() === user._id.toString()) {
    return res.sendStatus(301);
  }

  if (!existsLike) {
    const like = await likeModel.create({
      owner: user._id,
      video: id,
    });

    await videoModel.updateOne(
      { _id: id }, // 조건을 객체로 전달
      { $push: { likes: like._id } }
    );

    await userModel.updateOne(
      { _id: user._id }, // 조건을 객체로 전달
      { $push: { likes: like._id } }
    );

    return res.status(201).json({ newLikeId: like._id });
  }
};

export const cancelLike = async (req, res) => {
  const {
    params: { id },
    session: { user },
    body: { videoId },
  } = req;

  const like = await likeModel.findById({ _id: id });

  if (!like) {
    req.flash("error", "좋아요가 없어요");
    return res.status(403).redirect("/");
  }

  if (!like.owner.equals(user._id)) {
    req.flash("error", "계정을 확인해 주세요");
    return res.status(403).redirect("/");
  }

  await likeModel.findByIdAndDelete({ _id: like._id });

  await videoModel.updateOne({ _id: videoId }, { $pull: { likes: like._id } });

  await userModel.updateOne(
    { _id: user._id }, // 조건을 객체로 전달
    { $pull: { likes: like._id } }
  );
  return res.sendStatus(205);
};

import videoModel from "../model/video";
import userModel from "../model/user";

export const home = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // ES6 문법 const id = req.params.id 와 같다
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner");
  console.log(video);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  return res.render("videos/watch", { pageTitle: video.title, video });
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
    body: { title, description, hashtags },
  } = req;
  // const { id } = req.params;
  // const { title, description, hashtags } = req.body;
  const video = await videoModel.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  if (!video.owner.equals(_id)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
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
  // const {
  //   user: { _id },
  // } = req.session;
  // const { path: fileUrl } = req.file;
  // const { title, description, hashtags } = req.body;
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
    console.log(error);
    return res.status(400).render("videos/upload", { pageTitle: "upload video", errorMessage: error._message });
  }
  return res.redirect("/");
};

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
    videos = await videoModel.find({
      title: {
        // i는 대소문자를 구분없이 검색하게 해주는 것이다.
        // RegExp는 contains와 같다 포함하는 단어를 찾아주는 것
        $regex: new RegExp(keyword, "i"),
      },
    });
    console.log(videos);
  }
  return res.render("videos/search", { pageTitle: "search video", videos });
};

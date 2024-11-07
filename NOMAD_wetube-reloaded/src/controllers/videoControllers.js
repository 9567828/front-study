import videoModel from "../model/video";

export const home = async (req, res) => {
  const videos = await videoModel.find({}).sort({ createdAt: "desc" });
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // ES6 문법 const id = req.params.id 와 같다
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "video not found" });
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = async (req, res) => {
  // input에 입력한 값을 얻기 위해서 boyd를 사용한다!! 명심!
  const { title, description, hashtags } = req.body;
  try {
    await videoModel.create({
      title,
      description,
      hashtags: videoModel.formatHashtags(hashtags),
    });
  } catch (error) {
    return res.status(400).render("upload", { pageTitle: "upload video", errorMessage: error._message });
  }
  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await videoModel.findByIdAndDelete(id);
  return res.redirect("/");
};

// export const search = async (req, res) => {
//   const { keyword } = req.query;
//   if (keyword) {
//     const videos = await videoModel.find({
//       title: keyword,
//     });
//     return res.render("search", { pageTitle: "search video", videos });
//   }
//   return res.render("search", { pageTitle: "search video" });
// };

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
  return res.render("search", { pageTitle: "search video", videos });
};

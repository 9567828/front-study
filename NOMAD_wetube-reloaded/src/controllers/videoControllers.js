export const trending = (req, res) => res.send("trending videos");
export const see = (req, res) => {
  res.send(`Watch video #${req.params.id}`);
};
export const edit = (req, res) => {
  res.send("edit video");
};
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => res.send("delete Video");

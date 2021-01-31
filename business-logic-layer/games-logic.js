const dal = require("../data-access-layer/dal");

//get all games (api/games)
async function getAllGamesAsync() {
  const sql = `select * from game_list order by time desc`;
  const games = await dal.executeAsync(sql);
  return games;
}

//get all games by category (api/games/:category)
async function getAllGamesByCategoryAsync(category) {
  const sql = `select * from game_list where category = '${category}' order by time desc `;
  const games = await dal.executeAsync(sql);
  return games;
}

//get all comments by game id (api/comment/:id)
async function getAllCommentsAsync(id) {
    const sql = `SELECT * FROM comments where game_id = ${id} order by CommentDate`;
    const comments = await dal.executeAsync(sql);
    return comments;
  }

//post new comment (api/comment)  
async function addCommentAsync(comment) {
  const date = new Date().toLocaleString()
  const sql = `insert into comments
                 values(DEFAULT, '${comment.comment}', ${comment.game_id}, '${date}')`;
  const info = await dal.executeAsync(sql);
  comment.commentId = info.insertId;
  comment.commentDate = date
  return comment;
}

module.exports = {
  getAllGamesByCategoryAsync,
  addCommentAsync,
  getAllGamesAsync,
  getAllCommentsAsync
};

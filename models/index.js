const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require("./post")(sequelize, Sequelize);
db.Reply = require("./reply")(sequelize, Sequelize);

db.Post.hasMany(db.Reply);
db.Reply.belongsTo(db.Post, {
  foreignKey: "postId"
});

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

module.exports = db;

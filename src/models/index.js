const Blog = require("./blog");
const JunkTable = require("./blog_list_junction");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: JunkTable });
User.belongsToMany(Blog, { through: JunkTable });

module.exports = {
  Blog,
  User,
  JunkTable,
};

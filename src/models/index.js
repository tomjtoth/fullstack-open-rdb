const Blog = require("./blog");
const JunkTable = require("./blog_list_junction");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: JunkTable, as: "readings" });
Blog.belongsToMany(User, { through: JunkTable, as: "readingLists" });

module.exports = {
  Blog,
  User,
  JunkTable,
};

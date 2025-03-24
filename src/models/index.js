const Blog = require("./blog");
const JunkTable = require("./blog_list_junction");
const User = require("./user");
const Session = require("./session");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: JunkTable, as: "readings" });
Blog.belongsToMany(User, { through: JunkTable });

Blog.hasMany(JunkTable, { as: "readingLists" });

module.exports = {
  Blog,
  User,
  Session,
  JunkTable,
};

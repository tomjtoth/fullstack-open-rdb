require("dotenv").config();

const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();

    const notes = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });
    console.log(
      notes
        .map(
          ({ author, title, likes }) =>
            `${author || "Anonymous"}: '${title}', ${likes} likes`
        )
        .join("\n")
    );
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();

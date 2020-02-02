require("dotenv").config({ path: "./../config.env" });
const mongoose = require("mongoose");
const User = require("./../models/userModel");
const data = require("./data.json");

// db init.
const replaceObj = {
  "<username>": process.env.DB_USER,
  "<password>": process.env.DB_PASS
};
const dbUrl = process.env.DATABASE_URL.replace(
  /<username>|<password>/g,
  match => replaceObj[match]
);
const mongooseConnection = mongoose.connection;
mongooseConnection.on("open", () =>
  console.log("successfully connected to db.")
);
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// purge data.
const purgeUser = async () => {
  await User.deleteOne({ email: "user@gmail.com" });
  console.log("user purged.");
};

const createQuestions = async () => {
  // await
};

(async () => {
  await purgeUser();
  console.log("done");
})();
// get token.
// const token =

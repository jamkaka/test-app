const mongoose = require("mongoose");

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

const dbInit = () => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

module.exports = dbInit;

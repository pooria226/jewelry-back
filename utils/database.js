const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("db not connected", err);
  });

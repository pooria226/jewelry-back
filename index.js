const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/api");
require("dotenv").config();
class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddlewares();
  }
  setupRoutesAndMiddlewares() {
    // third-party middleware
    app.use(cors());
    // built-in middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    //routes
    app.use("/api", apiRoutes);
  }
  setupMongoose() {
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
  }
  setupExpressServer() {
    const port = process.env.PORT || 3001;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}
new Application();

const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const app = express();
const questionRoutes = require("./routes/question.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const articleRoutes = require("./routes/article.route");
const tagRoutes = require("./routes/tag.route");
const Topic = require("./models/topic.model");
const cors = require("cors");
require("dotenv").config();
let corsOptions = {
  origin: "*  ",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((res) => {
      console.log("connect db");
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/question", questionRoutes);

app.use("/api/user", userRoutes);

app.use("/api/articles", articleRoutes);

app.use("/api/tags", tagRoutes);

app.get("/api/topic", async (req, res) => {
  let topics = await Topic.find({});
  res.status(200).json({ topics: topics });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

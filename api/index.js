const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Middleware
    app.use("/images", express.static(path.join(__dirname, "public/images")));
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    });

    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
      try {
        return res.status(200).json("File uploaded successfully");
      } catch (error) {
        console.error(error);
      }
    });

    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/conversations", conversationRoute);
    app.use("/api/messages", messageRoute);

    app.listen(8900, () => {
      console.log("Backend server is running!");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectToDatabase();

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("Connect to DB");
};

const handleError = (error) => {
  console.log(`db error : ${error}`);
};

db.once("open", handleOpen);
db.on("error", handleError);

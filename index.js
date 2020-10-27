import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express()
const port = 3000

const handleProfile = (req, res) =>{
    res.send("This is profile");
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World !!!');
})

app.get("/profile", handleProfile);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
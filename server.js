import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express  from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { verifyPin } from "./controllers/verifyPin.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true})) 

// app.use(cors());
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

app.use(cors())

app.post("/", verifyPin);

const PORT = process.env.PORT || 5000 // 127.0.0.1;

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

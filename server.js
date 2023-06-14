import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express  from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { verifyPin } from "./controllers/verifyPin.js";
import expressLayouts from "express-ejs-layouts";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

//ejs
// app.use(expressLayouts);
app.set('views', './views');
app.set('view engine', 'ejs');

// middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true})) 

// app.use(cors());
app.use(morgan("common"));
// app.use(express.static('public'));

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(path.join(__dirname + 'public/css')));
app.use("/js", express.static(path.join(__dirname + 'public/js')));
app.use("/img", express.static(path.join(__dirname + 'public/img')));

//routes
app.get("", (req, res) => {
    res.render('index');
});
app.post("/verifyPin", verifyPin);

app.post("/backToVerify", (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3004 // 127.0.0.1;

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

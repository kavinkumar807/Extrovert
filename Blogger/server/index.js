const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');
const multer = require('multer');
const cors = require('cors');
const path  = require('path')


var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use("/images",express.static(path.join(__dirname,"/images")))


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(console.log("Connected...")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage:storage});
app.post("/server/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

app.use("/server/auth",authRoute);
app.use("/server/users",userRoute);
app.use("/server/posts",postRoute);
app.use("/server/categories",categoriesRoute);

app.listen("5000",()=>{
    console.log("Backend is running...")
})
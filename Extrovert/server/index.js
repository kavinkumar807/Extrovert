const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages')
const cors = require('cors');
const multer  = require('multer');
const path = require('path');

var corsOptions = {
    origin:'http://localhost:3000',
    credentials:true,
    optionsSuccessStatus:200 // For legacy browser support

}


dotenv.config();

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser:true , useUnifiedTopology:true ,useCreateIndex:true,useFindAndModify:true},()=>{
    console.log('Connected to MONGODB...')
})

//middleware
app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors(corsOptions));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage});
app.post("/server/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded sucessfully..")
    }catch(err){
        console.log(err);
    }
})

app.use("/server/users",userRoute);
app.use("/server/auth",authRoute);
app.use("/server/posts",postRoute);
app.use("/server/conversation",conversationRoute);
app.use("/server/message",messageRoute);


app.listen(5000,()=>{
    console.log("server running...");
});
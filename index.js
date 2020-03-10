const express         = require('express'),
    bodyParser      = require('body-parser'),
    routes          = require('./routes/routes'),
    expressSanitizer= require('express-sanitizer'),
    compression     = require('compression'),
    helmet          = require('helmet'),
    path            = require('path'),
    morgan          = require('morgan');

const mongoose      = require('mongoose');


const https     = require("https");
const fs        = require("fs");
require('dotenv').config()


    



const app = express();


const accessLogStream  = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags: 'a'});


mongoose.connect(process.env.MONGODB,  { useNewUrlParser: true,  useUnifiedTopology: true });
app.use(helmet());
app.use(morgan("combined", {stream: accessLogStream}))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(compression());






app.use(routes);

app.set('view engine', 'ejs');











app.listen( process.env.PORT || 5000,()=>{

        console.log("SERVER STARTED ON", process.env.PORT || 5000 )
    } )

// https.createServer({key: privateKey, cert: certificate}, app).listen(process.env.PORT || 5000 , ()=>{

//     console.log("SERVER STARTED ON", process.env.PORT || 5000 )
// })


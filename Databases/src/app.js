const express =require('express');
const app = express();
require('./db/conn.js');
const hbs= require('hbs');
const path = require('path');
const register=require('./models/regdetails.js');
const viewspath =path.join(__dirname,"../templates/views");
const partialspath =path.join(__dirname,"../templates/partials");
app.set("views",viewspath);
app.set("view engine","hbs")
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(partialspath);
app.get("/",(req, res) => {
// res.send("hello testin41356g");
res.render("index"); 
}); 

app.listen(3000,() => {"server is listening to 3000 port"});
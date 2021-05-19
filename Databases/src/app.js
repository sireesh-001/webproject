const express =require('express');
const app = express();
require('./db/conn.js');
const hbs= require('hbs');
var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/login";
app.use(express.static('public'));
const path = require('path');
const register=require('./models/regdetails.js');
const register1=require('./models/checkdetails.js');
const viewspath =path.join(__dirname,"../templates/views");
const partialspath =path.join(__dirname,"../templates/partials");
app.set("views",viewspath);
app.set("view engine","hbs")
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(partialspath);
let alert = require('js-alert');
// let alert1 = require('alert');




app.get("/",(req, res) => {
MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
         res.render("index",{post:
         { but1:'none',
           but2:'inline',
           but3:'inline',
           but4:result[i].username
        }});
        }
      }
      if(h==0){
        res.render("index");
      }
      db.close();
    });
  }); 
}); 




app.get("/signup",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
        }
      }
      if(h>0){
        alert("Already logged in, cannot Enter");
        res.redirect("/");
      }
      else{
        res.render("signup");
      }
      db.close();
    });
  }); 
})








app.post("/signup",async(req, res) => {
    try{
    const userrecord=new register({
name:req.body.name,
country:req.body.country,
city:req.body.city,
state:req.body.state,
zip:req.body.zip,
username:req.body.username,
password:req.body.password,
login:0
    })
    const signupstatus=await userrecord.save();
    res.redirect("/login");
}
catch(e){
res.send(e);
res.status(404);
}
})






app.get("/login",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
        }
      }
      if(h>0){
        alert("Already logged in, cannot Enter");
        res.redirect("/");
      }
      else{
        res.render("login");
      }
      db.close();
    });
  }); 
    })





app.post("/login",async(req, res) => {
    try{
        MongoClient.connect(url1, function(err, db) {
            if (err) throw err;
            var dbo = db.db("regdb");
            dbo.collection("userdatas").find({}).toArray(function(err, result) {
              if (err) throw err;
              for(i=0; i<result.length; i++){
              let value2=req.body.username==result[i].username;
              let value3=req.body.password==result[i].password;  
              if(value2 && value3)
              {
                var myquery = { username:req.body.username ,login: 0 };
                var newvalues = { $set: {username:req.body.username ,login:1 } };
                dbo.collection("userdatas").findOneAndUpdate(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  console.log("1 document updated");
                });
                res.redirect("/");
              }}
              db.close();
            });
          });
}
catch(e){
res.send(e);
res.status(404);
}
});
// app.listen(3000,() => {"server is listening to 3000 port"});

app.get("/dining",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
         res.render("index1",{post:
         { but1:'none',
           but2:'inline',
           but3:'inline',
           but4:result[i].username
        }});
        }
      }
      if(h==0){
        res.render("index1");
      }
      db.close();
    });
  }); 
  })



app.get("/living",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
         res.render("index3",{post:
         { but1:'none',
           but2:'inline',
           but3:'inline',
           but4:result[i].username
        }});
        }
      }
      if(h==0){
        res.render("index3");
      }
      db.close();
    });
  }); 
    })




app.get("/bedroom",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            h+=1;
         res.render("index2",{post:
         { but1:'none',
           but2:'inline',
           but3:'inline',
           but4:result[i].username
        }});
        }
      }
      if(h==0){
        res.render("index2");
      }
      db.close();
    });
  }); 
      })

app.get("/checkout",(req, res) => {
  MongoClient.connect(url1, function(err, db) {
    if (err) throw err;
    var dbo = db.db("regdb");
    dbo.collection("userdatas").find({}).toArray(function(err, result) {
      dbo.collection("items").find({}).toArray(function(err, result1) {
      if (err) throw err;
      let h=0;
      for(i=0; i<result.length; i++){
        if(result[i].login==1){
          h+=1;}}
          if(h==0){
            alert.alert("Not yet logged In,Please login and try again");
            // alert1("Not yet logged In,Please login and try again");
            res.redirect("login");
          }
          else{
      for(i=0; i<result.length; i++){
          if(result[i].login==1){
            for(j=0; j<result1.length; j++){
              if(result1[j].no==result[i].cart[1]){
         res.render("checkout",{post:
         { but1:'none',
           but2:'inline',
           but3:'inline',
           but4:result[i].username,
           but5:result1[j].path,
           but6:result1[j].name,
           but7:"Pay "+result1[j].price
        }});}
        }}
      }
      db.close();
    }});});
  }); 
        })
app.post("/checkout",async(req, res) => {
          try{
          const userrecord=new register1({
      email:req.body.email,
      card:req.body.card,
      month:req.body.month,
      cvv:req.body.cvv,
      namecard:req.body.namecard,
      country:req.body.country,
      Zip:req.body.zip
          })
          const signupstatus=await userrecord.save();
          alert.alert("Order sucessful and will be deliverd to you shortly");
          res.redirect("/");
      }
      catch(e){
        res.send(e);
        res.status(404);
      }
      })

      app.post("/living",async(req, res) => {
        try{
            MongoClient.connect(url1, function(err, db) {
                if (err) throw err;
                var dbo = db.db("regdb");
                dbo.collection("userdatas").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  for(i=0; i<result.length; i++){
                    if(result[i].login==1){
                      dbo.collection("userdatas").findOneAndUpdate({username:result[i].username},{$addToSet: {cart: parseInt(req.body.no)}}, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                      });}
                  if(result[i].login==1){
                    dbo.collection("userdatas").findOneAndUpdate({username:result[i].username},{$push: {cart: parseInt(req.body.no)}}, function(err, res) {
                      if (err) throw err;
                      console.log("1 document updated");
                    });
                    res.redirect("/living");
                  }}
                  db.close();
                });
              });
    }
    catch(e){
    res.send(e);
    res.status(404);
    }
    });
      


        app.get("/signout",async(req, res) => {
          try{
              MongoClient.connect(url1, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("regdb");
                  dbo.collection("userdatas").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    for(i=0; i<result.length; i++){
                    if(result[i].login==1)
                    {
                      var myquery = { username:result[i].username ,login: 1 };
                      var newvalues = { $set: {username:result[i].username ,login:0 } };
                      dbo.collection("userdatas").findOneAndUpdate(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                      });
                      res.redirect("/");
                    }}
                    db.close();
                  });
                });
      }
      catch(e){
      res.send(e);
      res.status(404);
      }
      });


      app.listen(3000,() => {"server is listening to 3000 port"});
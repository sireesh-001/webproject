const mongoose= require('mongoose');
const usersschema= new mongoose.Schema(
    {
name: {type:String,required:true},
country: {type:String,required:true},
city:{type:String,required:true},
state:{type:String,required:true},
zip:{type:String,required:true},
username:{type:String,required:true},
password:{type:String,required:true},
login:{type:Number},
cart:{type:[Number]},
order:{type:[Number]},
    }
)

const register=new mongoose.model('userdata',usersschema);
module.exports =register;
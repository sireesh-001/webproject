const mongoose= require('mongoose');
const usersschema= new mongoose.Schema(
    {
email: {type:String,required:true},
card: {type:String,required:true},
month:{type:String,required:true},
cvv:{type:String,required:true},
namecard:{type:String,required:true},
country:{type:String,required:true},
Zip:{type:String,required:true}
    }
)

const register1=new mongoose.model('checkdata',usersschema);
module.exports =register1;
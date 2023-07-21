const mongoose =require('mongoose');
//create Schema
const categorySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Category required'],
            unique:[true,'Category must be unique'],
            minlength:[3,'too short category name'],
            maxlength:[32,'too long catregory name'],
        },
        slug:{
            type:String,
            lowercase:true,
        },
        image:String,
    },
    {timestamps:true}
);
//create model
const CategoryModel=mongoose.model('Category',categorySchema);
module.exports=CategoryModel;
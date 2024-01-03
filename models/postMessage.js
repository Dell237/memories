// utilize the possibilities of  mongoose
import mongoose from "mongoose";

//create a mongoose schema
const postSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String] ,
    selectedFile: String,
    likeCount : { //make objekt, beacuse we have to add additional information
        type : Number,
        default : 0,  
    },
    createdAt : {
        type : Date,
        default : new Date(),
    }
});

//now we have Schema, we turn it into a model 
const PostMessage = mongoose.model("PostMessage", postSchema);


/* we export  a mongoose model from the PostMessage.js and then on that model later on
we will be able to run commands such as find, create, delete, update  */
export default PostMessage;
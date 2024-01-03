/* creat all the handlers for our routes
because if we keep adding routes and adding more complex logic
or file for routes is going to get longg and we are going to get lost between
all the logic and all the requests 
its going to be hard to see what routes do you even have access to 
to simple it: we extract all the functions from routes and then take it
in posts.js in cotrollers  */

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


//because finding something inside of a model take time -> async await
export const getPosts = async (req, res) =>{
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
         res.status(404).json({message : error.message});   
    }

}

// adding differnet posts
export const createPost = async (req, res) =>{
    const post = req.body;

    const newPost = PostMessage(post);

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

//post/123 id:123
export const updatePost = async (req, res) =>{

    const { id: _id } =  req.params; 
    const post  = req.body; // we receving the data from front end
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that id`);

    // we reciv data titel, name,tags.. from frontend, but not id. so create new object and we send id with postdata {...post, _Id} or
    //const updatedPost = { creator, title, message, tags, selectedFile, _id: id }; //rename id to _id

    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id} , {new: true});
    
    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
    
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);
}


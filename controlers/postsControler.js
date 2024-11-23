import fs from 'fs';
import PostsModels from '../models/postModels.js';
import gemini from '../services/gemini.js';




    export async function getAllPosts(req, res){
        try{
            const postModels = new PostsModels(process.env.MONGO)
            const posts = await postModels.getAllPosts();
            res.status(200).json({
                response: posts
            });
        }catch(err){
            console.error(err.message)
            res.status(500).json({
                response: "errou"
            });
        }
        
    }

    export async function postPosts(req, res){
        const post = req.body;
        const postModels = new PostsModels(process.env.MONGO)
        try{
            const potsPost = await postModels.postPosts(post);
            res.status(200).json({
                response: potsPost
            });

        }catch(err){
            console.error(err.message)
            res.status(500).json({
                response: "errou"
            });
        }
    }

    export async function uploadImage(req, res){
        const postModels = new PostsModels(process.env.MONGO);
        const post = {
            photo : req.file.originalname,
            text: ""
        }
        try{
            const potsPost = await postModels.postPosts(post);
            const imageUpdated = `uploads/${potsPost.insertedId}.png`;
            fs.renameSync(req.file.path, imageUpdated);
            res.status(200).json({
                response: potsPost
            });

        }catch(err){
            console.error(err.message)
            res.status(500).json({
                response: "errou"
            });
        }
    }

    export async function alterPost(req, res){
        const postModels = new PostsModels(process.env.MONGO);
        const id = req.params.id;
        const urlImage = `http://localhost:3001/${id}.png`;
        
        try{
            const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
            const text = await gemini(imageBuffer);
            const post = {
                photo: urlImage,
                text: text
            }
            const response = await postModels.alterPost(id, post);
            res.status(200).json({
                response: response
            })

        }catch(err){
            console.error(err.message);
            res.status(500).json({
                response: "internal error"
            });
        }
    }


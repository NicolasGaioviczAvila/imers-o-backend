import express from 'express';
import multer from 'multer';
import {getAllPosts, postPosts, uploadImage, alterPost} from '../controlers/postsControler.js'
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "./uploads", storage})

router.get("/", getAllPosts);

router.post("/", postPosts);

router.post("/upload", upload.single("image"), uploadImage)

router.put("/upload/:id", alterPost)

export default router;
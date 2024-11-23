import { ObjectId } from 'mongodb';
import MongoConn from '../conn.js';




export default class PostsModels {

    constructor(conn){
        this.mongoConn = new MongoConn(conn);
    }

    getAllPosts = async()=>{
        await this.mongoConn.open();
        const posts = this.mongoConn.db.collection("posts");
        await this.mongoConn.close();
        return posts.find().toArray();
    }
    postPosts = async(post)=>{
        await this.mongoConn.open();
        const posts = this.mongoConn.db.collection("posts");
        await this.mongoConn.close();
        return posts.insertOne(post);
    }
    uploadImage = async(image)=>{
        await this.mongoConn.open();
        const posts = this.mongoConn.db.collection("posts");
        await this.mongoConn.close();
        return posts.insertOne(image);
    }
    alterPost = async(id, post)=>{
        await this.mongoConn.open();
        const posts = this.mongoConn.db.collection("posts");
        await this.mongoConn.close();
        const objID = ObjectId.createFromHexString(id);
        return posts.updateOne({_id: new ObjectId(objID)}, {$set:post});
    }
}
import { MongoClient } from 'mongodb'

export default class MongoConn{

    constructor(conn){
        this.client = new MongoClient(conn)
        this.db = this.client.db("instabytes")
    }

    async open(){
        try{
            await this.client.connect();
            console.log("deu good")
        }catch(err){
            console.log(err)
        }
        
    }

    async command(command){
        await this.open()
        const result = this.db.command(command);
        await this.close()
        return result;
        
    }

    async close(){
        await this.client.connect();
    }

}
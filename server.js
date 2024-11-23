import express from 'express';
import index from './routes/index.js';
import 'dotenv/config'
import cors from 'cors';

const app = express();

const corsOptions ={
    origin: "http://localhost:3000",
    optionsSucessesStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json());

app.use(express.static("uploads"));

app.use("/posts", index);

app.listen(3001, ()=>{
    console.log('server listning ' + process.env.mongo);
});

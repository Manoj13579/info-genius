import express from 'express';
import cors from 'cors';
import indexRouter from './routes/indexRouter.js';
import dotenv from 'dotenv';
dotenv.config();




const app = express();




app.use(express.json());

app.use(cors({
origin: process.env.FRONTEND_URL,
}));
const PORT = process.env.PORT || 4000


app.use('/', indexRouter);

app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is running on port ${PORT}`);
    }
      else{
        /*can write ${error} or + error */
        console.log("Error:" + error)
      }  
      });
import express from 'express';
import geminiRoute from './geminiRoute.js';


const indexRouter = express.Router();

indexRouter.use('/api/gemini', geminiRoute);


export default indexRouter;
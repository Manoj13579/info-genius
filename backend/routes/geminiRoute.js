import express from 'express';
import geminiMessageApi from '../controller/geminiMessageApi.js';
import geminiTranslator from '../controller/geminiTranslator.js';
import upload from '../middleware/uploadMiddleware.js';
import geminiMessageImageApi from '../controller/geminiMessageImageApi.js';


const geminiRoute = express.Router();


geminiRoute.post('/gemini-message-api', geminiMessageApi);
geminiRoute.post('/gemini-message-image-api', upload.single("image"), geminiMessageImageApi);
geminiRoute.post('/gemini-translator', geminiTranslator);



export default geminiRoute;
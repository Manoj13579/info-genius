import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

const  geminiMessageImageApi = async (req, res) => {
    
    try {
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

        const uploadResult = await fileManager.uploadFile(
            req.file.path,
            {
                mimeType: req.file.mimetype,
                displayName: req.file.originalname,
            },
        );

        console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
        );

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Default to an empty string if no text is provided
        const userInputText = req.body.text || ""; 

        const result = await model.generateContent([
            `Based on the following text: "${userInputText}"`,
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
        ]);

        fs.unlinkSync(req.file.path);

        return res.status(200).json({ 
            success: true, 
            message: 'Response successful', 
            result: result.response.text() 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the image.');
    }
};

export default  geminiMessageImageApi;
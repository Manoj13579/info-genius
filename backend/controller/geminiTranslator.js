import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiTranslator = async (req, res) => {
    const { inputText, fromLanguage, toLanguage } = req.body;
   
    try {
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Create a translation prompt based on the user message and target language
        const prompt = `Translate the following text from ${fromLanguage} to ${toLanguage} without additional explanations or context: "${inputText}"`;
        
        // Generate content using the model with the translation prompt
        const result = await model.generateContent(prompt);
        
        // Extract the translated text from the result
        const translatedText = result?.response?.text();
        

        // Return the translated text in the response
        return res.status(200).json({
            success: true,
            message: 'Translation successful',
            translatedText
        });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};

export default geminiTranslator;
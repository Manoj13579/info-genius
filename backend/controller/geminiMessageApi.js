import { GoogleGenerativeAI } from "@google/generative-ai";



const geminiMessageApi = async (req, res) => {

    const { usermessage } = req.body;
    console.log(usermessage);
    
try {
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(usermessage);
    
    // response text is inside result.response.text(). text() is method that contains response.accordingly docs
    return res.status(200).json({ success: true, message: 'response successfull', result: result.response.text()})
} catch (error) {
    console.log('geminiApi', error);
    return res.status(500).json({ success: false, message: error.message });
}
};

export default geminiMessageApi;

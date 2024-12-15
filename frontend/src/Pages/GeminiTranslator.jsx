import { useState } from 'react';
import axios from 'axios';
import Loader from '../Utils/Loader';
import { MdEditNote } from "react-icons/md";
import Tooltip from '../Utils/Tooltip';


const GeminiTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Spanish');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    // required doesn't apply to text area
   if(!inputText) {
    alert(`input field can't be empty`)
    return
   };
   setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini/gemini-translator`, {
        inputText,
        fromLanguage,
        toLanguage
      });
      if(response.data.success) {
        setTranslatedText(response.data.translatedText);
        setInputText('');
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    };
    setLoading(false);
  };

  const clearText = () => {
    setTranslatedText("");
  }

  return (
    <section className='bg-black h-screen w-full flex justify-center items-center'>
    <div className="w-3/4 lg:w-2/4 mx-auto p-6 shadow-lg rounded-lg bg-neutral-900">
    <Tooltip message="Clear Text">
        <MdEditNote className='cursor-pointer w-7 h-7 text-blue-500' onClick={clearText} />
        </Tooltip>
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Language Translator</h1>

      {/* Input Text Area */}
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        id="text-area"
        placeholder="Enter text to translate..."
        required
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="4"
      />

      {/* Language Selection */}
      <div className="mt-4 flex flex-col lg:flex-row justify-between">
        <div>
          <label htmlFor="from-language" className="block text-blue-500">From:</label>
          <select
            id="from-language"
            required
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
          >
           <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
            <option value="Nepali">Nepali</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>

        <div>
          <label htmlFor="to-language" className="block text-blue-500">To:</label>
          <select
            id="to-language"
            required
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
            <option value="Nepali">Nepali</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      {/* Translate Button */}
      <button
        onClick={handleTranslate}
        className="w-full mt-6 p-2 bg-blue-500 text-white text-xl rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      >
      Translate<span className='ml-4'>{loading ? <Loader />: ''}</span>
      </button>

      {/* Display Translated Text */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md overflow-y-auto max-h-52">
        <h3 className="text-lg font-semibold">Translated Text:</h3>
        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{translatedText}</p>
      </div>
    </div>
    </section>
  );
};

export default GeminiTranslator;
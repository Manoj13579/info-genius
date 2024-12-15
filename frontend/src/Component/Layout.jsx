import { useRef, useState } from 'react';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import axios from 'axios';
import Loader from '../Utils/Loader';
import ResponseScreen from './ResponseScreen';
import { TypeAnimation } from 'react-type-animation';
import { TfiClip } from "react-icons/tfi";
import Tooltip from '../Utils/Tooltip';
import { Link } from 'react-router-dom';



const Layout = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  // can use useRef for multiple references
  const inputRef = useRef();
  const inputFileRef = useRef(null);
 

  
// file size limit should be less than 3 MB
  const MAX_FILE_SIZE = 3 * 1024 * 1024;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPEG, JPG, and PNG are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size should be less than 3 MB");
        return;
      }
      setImage(file);
    }
  };


  const textRequest = (e) => {
    e.preventDefault();
    if (message) {
      geminiMessageApi(message);
    } else {
      alert("You must write something... !");
    }
  };


  const geminiMessageApi = async (usermessage) => {
    
    if (!usermessage) return;
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini/gemini-message-api`, { usermessage });
     
      const { result } = response.data;
      if (response.data.success) {
        const newMessages = [
          ...messages,
          { type: "userMsg", text: usermessage },
          { type: "responseMsg", text: result },
        ];
        setMessages(newMessages);
        setisResponseScreen(true);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const textImageRequest = (e) => {
    e.preventDefault();
    if (message) {
      geminiMessageImageApi(message);
    } else {
      alert("You must write something... !");
    }
  };


  const geminiMessageImageApi = async (usermessage) => {
    
    if (!usermessage) return;
    setLoading(true);
    try {
      /* to upload image with text in multer should use FormData like this. for gemini api had to send fron one request so used this way. image and text are key with value */
      const uploadedImageWithText = new FormData();
      uploadedImageWithText.append("image", image);
      uploadedImageWithText.append("text", usermessage);
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gemini//gemini-message-image-api`, uploadedImageWithText);
     
      const { result } = response.data;
      if (response.data.success) {
        const newMessages = [
          ...messages,
          { type: "userMsg", text: usermessage },
          { type: "responseMsg", text: result },
        ];
        setMessages(newMessages);
        setisResponseScreen(true);
        setMessage("");
        setImage(null);
        inputFileRef.current.value = ""; //Reset the file input field
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  }

  const newChat = () => {
    setisResponseScreen(false);
    setMessages([]);
    setMessage("");
  setImage(null);  // Reset the image state
  //Reset the file input field. used if coz if only text response no need t clear upload input
  if (inputFileRef.current) {
    inputFileRef.current.value = "";
  }
  }

  return (
    <section>
      <div className="w-screen min-h-screen overflow-x-hidden bg-neutral-800 text-white">
        <p className='text-neutral-500 p-4 font-bold text-xl'>InfoGenius 4.0  <Link to="/gemini-translator">AI Translator
        </Link>
        </p>
        
        {isResponseScreen ? <ResponseScreen messages = {messages} newChat = {newChat}/> : (
          <div className="flex flex-col items-center justify-center mt-16 lg:mt-10 gap-y-28 lg:gap-y-8">
            <TypeAnimation
  sequence={[
    'What Can I help with?',
    500,
  ]}
  style={{ fontSize: '2em' }}
  cursor={false} // Disable the blinking cursor
  repeat={0} // Don't repeat
/>
              {/* cards */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] relative h-40 w-40 bg-neutral-900 p-[10px]">
                <p className='text-sm md:text-lg'>What is coding ? <br />
                  How we can learn it.</p>
                <i className='absolute right-3 bottom-3 text-sm md:text-lg'><IoCodeSlash /></i>
              </div>
              <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] relative h-40 w-40 bg-neutral-900 p-[10px]">
                <p className='text-sm md:text-lg'>Which is the red <br />
                  planet of solar <br />
                  system </p>
                <i className='absolute right-3 bottom-3 text-sm md:text-lg'><BiPlanet /></i>
              </div>
              <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] relative h-40 w-40 bg-neutral-900 p-[10px]">
                <p className='text-sm md:text-lg'>In which year python <br />
                  was invented ?</p>
                <i className='absolute right-3 bottom-3 text-sm md:text-lg'><FaPython /></i>
              </div>
              <div className="rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] relative h-40 w-40 bg-neutral-900 p-[10px]">
                <p className='text-sm md:text-lg'>How can we use <br />
                  AI?</p>
                <i className='absolute right-3 bottom-3 text-sm md:text-lg'><TbMessageChatbot /></i>
              </div>
            </div>
          </div>
        )}
        
        {/* input */}
        <div className="w-full flex flex-col items-center justify-center fixed ">
        <form
  className="inputBox w-[60%] text-[15px] flex flex-col items-center bg-neutral-900 rounded-[30px] min-h-20"
  onSubmit={message && image ? textImageRequest : textRequest}
>
<div className="w-full flex items-start">
  <label htmlFor="file-input">
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="Uploaded Preview"
        className="w-20 h-20 rounded-lg object-cover p-2"
      />
    ): <Tooltip message="Upload Image"> <TfiClip className="w-8 h-8 pt-2 cursor-pointer " /> </Tooltip>}
     
    <input
      type="file"
      onChange={handleFileChange}
      id="file-input"
      hidden
      ref={inputFileRef}
    />
  </label>
  </div>
  <div className="w-full flex items-center">
    <input
      type="text"
      value={message}
      ref={inputRef}
      autoFocus
      onChange={(e) => setMessage(e.target.value)}
      className="pl-[15px] py-2 bg-transparent flex-1 outline-none border-none"
      placeholder="Write your message here..."
      id="messageBox"
    />
    {message && (
      <button
        className="text-green-500 text-xl mr-5 cursor-pointer"
        type="submit"
      >
        {loading ? <Loader /> : <IoSend />}
      </button>
    )}
  </div>
</form>
          <p className='text-[gray] text-[14px] px-4'>Info Genius is developed by Mnj. This AI uses the gemini API for giving the response.</p>
        </div>
      </div>
    </section>
  )
}

export default Layout;
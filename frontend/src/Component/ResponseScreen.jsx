import { MdEditNote } from "react-icons/md";
import { TypeAnimation } from 'react-type-animation';
import Tooltip from "../Utils/Tooltip";


const ResponseScreen = ({ messages, newChat }) => {
  return (
    <div className='h-[81vh] xl:h-[68vh] w-screen '>
      <Tooltip message="Clear Chat">
        <MdEditNote className='cursor-pointer w-7 h-7 ml-4' onClick={newChat} />
        </Tooltip>
      <div className="flex flex-col px-24 pb-40 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col">
          {messages?.map((msg, index) => {
            return (
              <div
                key={index}
                className={`bg-neutral-900 p-4 rounded-3xl w-12/12 md:w-3/5
                  ${msg.type === "userMsg" ? "self-end" : "self-start mt-4"}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {msg.type === "responseMsg" ? (
                  <TypeAnimation
                    sequence={[
                      msg.text, // The message text to animate
                      3000,     // Wait time after the message is fully displayed
                    ]}
                    speed={{ type: 'keyStrokeDelayInMs', value: 15 }} //decrease value to increase speed
                    omitDeletionAnimation={true}
                    style={{ fontSize: '1em', display: 'block' }}
                    repeat={0} // Repeat just once
                    cursor={false}
                  />
                ) : (
                  <span style={{ fontSize: '1em' }}>{msg.text}</span> // Regular display for user messages
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResponseScreen;
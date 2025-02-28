import { useContext } from "react";
import "./App.css";
import ai from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/Usercontext";
import speakimg from "./assets/speak.gif";
import aiv from "./assets/aiVoice.gif";
const App = () => {
  const { recognition, speaking, setSpeaking, prompt, response, responseTime } = useContext(datacontext);

  return (
    <div>
      <div className="main">
        <img src={ai} alt="Jarvis" id="Jarvis" />
        <span>I am Jarvis, Your Advanced Virtual Assistant</span>
        {!speaking ? (
          <button
            className="btn"
            onClick={() => {
              setSpeaking(true);
              recognition.start();
            }}
          >
            Click Here <CiMicrophoneOn />
          </button>
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-column gap-10">
            <div>
              {!response ? (
                <img src={speakimg} alt="speaking" id="speaking" className="img-fluid" />
              ) : (
                <img src={aiv} alt="aiVoice" id="voice" className="img-fluid" />
              )}
            </div>
            <p className="prompt-text">{prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

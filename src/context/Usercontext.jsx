import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import run from '../gemini';

export const datacontext = createContext();

function Usercontext({ children }) {
    const [speaking, setSpeaking] = useState(false);
    let [prompt, setprompt] = useState("Listening");
    let [response, setResponse] = useState(false);
    let [responseTime, setResponseTime] = useState(0);

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = 'en-US';
        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
        const startTime = Date.now();
        let text = await run(prompt);
        let newtext = text.replace(/google/gi, "Suman");
        setprompt(newtext);
        speak(newtext);
        setResponse(true);
        console.log(newtext);
        setTimeout(() => {
            setResponse(false);
            setSpeaking(false);
            const endTime = Date.now();
            setResponseTime(endTime - startTime); 
            console.log(`AI response time: ${endTime - startTime} ms`); 
        }, 11000);
    }

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setprompt(transcript);
        aiResponse(transcript);
    };

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setprompt,
        response,
        setResponse,
        responseTime
    };

    return (
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    );
}

// PropTypes validation
Usercontext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Usercontext;
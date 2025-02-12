import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import run from '../gemini';

export const datacontext = createContext();

function Usercontext({ children }) {
    const [speaking, setSpeaking] = useState(false);
    let [prompt, setprompt] = useState("Listening");
    let [response, setResponse] = useState(false);

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = 'en';
        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
        let text = await run(prompt);
        let newtext=text.split("*")&&text.split("*")&&text.replace("google","Suman");
        setprompt(newtext);
        speak(newtext);
        setResponse(true);
        console.log(text);
        // Reset the response state and speaking state after processing
        setTimeout(() => {
            setResponse(false);
            setSpeaking(false);
        }, 6000);
    }

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setprompt(transcript);
        aiResponse(transcript);
    };
// function takeCommand(command){
//     if(command.include("open")&& command.include("youtube"))
//     {
//         window.open("https://www.youtube.com/","_blank");
//     speak("Opening youtube");
//     setTimeout(() => {
//         setResponse(false);
//     }, 3000)}
//     else{
//         aiResponse(command);
//     }
// }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setprompt,
        response,
        setResponse
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
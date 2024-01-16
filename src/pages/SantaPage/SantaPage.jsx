import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SantaPage.css";
import arrow from "../../assets/arrow-left.svg";
import ChatGptIconSanta from "../../assets/santa-svg.png";
import Usersvg from "../../assets/user-svg.svg";
import Paper_plane from "../../assets/paper-plane.svg";

const SantaPage = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const serverRequest = async (message) => {
        try {
            const req = await fetch(
                "https://8867-2-133-130-122.ngrok-free.app/api/santa",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                    }),
                }
            );
            const res = await req.json();
            console.log(res);

            return res;
        } catch (error) {
            console.error("Error making API request:", error);
            return { message: "Error occurred while processing your request." };
        }
    };

    const fetchData = async () => {
    };

    useEffect(() => {
        fetchData();
        const initialQuestion = "Hello, Help me Please!";
        setMessages([{ text: initialQuestion, source: "YOU", key: Date.now() }]);

        const getInitialAnswer = async () => {
            await simulateTyping("Hello! How can I assist you today?", "SANTA");
        };

        getInitialAnswer();
    }, []);

    const simulateTyping = async (text, source) => {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessages((prev) => [...prev, { text, source, key: Date.now() }]);
        setIsTyping(false);
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim().length === 0) {
            return;
        }

        setMessages((prev) => [
            ...prev,
            { text: inputMessage, source: "YOU", key: Date.now() },
        ]);

        await simulateTyping("", "SANTA");

        try {
            const apiResponse = await serverRequest(inputMessage);

            if (apiResponse && apiResponse.message && apiResponse.message.trim()) {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: apiResponse.message.trim(),
                        source: "SANTA",
                        key: Date.now(),
                    },
                ]);
            }
        } catch (error) {
            console.error("Error handling send message:", error);
        }

        setInputMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <header className="header">
                <NavLink to="/">
                    <img src={arrow} alt="arrow" />
                </NavLink>
                <div className="title">Chat with Santa GPT</div>
            </header>

            <section>
                <div className="chat-container">
                    {messages.map(
                        (message, index) =>
                            message.text &&
                            message.text.trim() && (
                                <div
                                    key={message.key}
                                    className={message.source === "YOU" ? "you" : "gpt"}
                                >
                                    {message.source === "YOU" && (
                                        <div className="user-avatar">
                                            <img src={Usersvg} alt="" />
                                            <div className="user-title">You</div>
                                        </div>
                                    )}
                                    {message.source === "SANTA" && (
                                        <div className="gpt-avatar_santa">
                                            <img src={ChatGptIconSanta} alt="" />
                                            <div className="chatgpt-title">SANTA</div>
                                        </div>
                                    )}
                                    {message.text && message.text.trim()}
                                </div>
                            )
                    )}
                    {isTyping && (
                        <div className="gpt-typing">
                            <div className="chatgpt-title">SANTA</div>
                            <img src={ChatGptIconSanta} alt="" />
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="input-message">
                <div className="input">
                    <input
                        type="text"
                        placeholder="Your message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="input-send" onClick={handleSendMessage}>
                    <img src={Paper_plane} alt="paper" />
                </div>
            </div>
        </div>
    );
};

export default SantaPage;

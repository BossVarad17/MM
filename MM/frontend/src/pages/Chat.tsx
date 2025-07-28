import { useState } from 'react';

// This is the Chat component from your GitHub
interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const Chat = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
        setChatHistory(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        setUserInput('');

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userInput }),
            });
            const data = await response.json();
            const aiMessage: ChatMessage = { sender: 'ai', text: data.response || data.error };
            setChatHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Failed to fetch chat response:", error);
            const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I am unable to connect to the server.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div style={{ padding: '2rem', color: 'white' }}>
            <h2>AI Mechanic Assistant</h2>
            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px', height: '60vh', overflowY: 'auto', marginBottom: '1rem' }}>
                {chatHistory.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
                        <p style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            borderRadius: '10px',
                            background: msg.sender === 'user' ? '#007bff' : '#333'
                        }}>
                            {msg.text}
                        </p>
                    </div>
                ))}
                {isLoading && <p>AI is thinking...</p>}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    style={{ flex: 1, padding: '0.5rem', background: '#333', border: '1px solid #555', color: 'white' }}
                />
                <button onClick={handleSend} disabled={isLoading} style={{ padding: '0.5rem 1rem', background: '#007bff', border: 'none', color: 'white' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

interface ChatProps {
    session: Session;
}

interface ChatMessage {
    id?: number;
    sender: 'user' | 'ai';
    content: string;
    created_at?: string;
}

const Chat = ({ session }: ChatProps) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom of the chat window
    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [chatHistory]);

    // Fetch initial chat history and set up real-time subscription
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .order('created_at', { ascending: true });
            
            if (error) {
                console.error('Error fetching chat history:', error);
            } else {
                setChatHistory(data);
            }
        };
        fetchHistory();

        // Subscribe to new messages in the chat_messages table
        const subscription = supabase.channel('public:chat_messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' },
                (payload) => {
                    setChatHistory((prevHistory) => [...prevHistory, payload.new as ChatMessage]);
                }
            )
            .subscribe();

        // Cleanup subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleSend = async () => {
        if (!userInput.trim() || !session.user) return;

        const userMessage = userInput;
        setUserInput('');
        
        // 1. Insert user message into Supabase
        await supabase
            .from('chat_messages')
            .insert({ user_id: session.user.id, content: userMessage, sender: 'user' });

        setIsLoading(true);

        // 2. Call your backend to get the AI response
        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMessage }),
            });
            const data = await response.json();
            const aiResponse = data.response || data.error;

            // 3. Insert AI response into Supabase
            await supabase
                .from('chat_messages')
                .insert({ user_id: session.user.id, content: aiResponse, sender: 'ai' });

        } catch (error) {
            console.error("Failed to fetch chat response:", error);
            // Optionally insert an error message into the database
            await supabase
                .from('chat_messages')
                .insert({ user_id: session.user.id, content: 'Sorry, unable to connect to the AI service.', sender: 'ai' });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div style={{ padding: '2rem', color: 'white' }}>
            <h2>AI Mechanic Assistant</h2>
            <div ref={chatContainerRef} style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px', height: '60vh', overflowY: 'auto', marginBottom: '1rem' }}>
                {chatHistory.map((msg) => (
                    <div key={msg.id} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
                        <p style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            borderRadius: '10px',
                            background: msg.sender === 'user' ? '#007bff' : '#333'
                        }}>
                            {msg.content}
                        </p>
                    </div>
                ))}
                {isLoading && <p style={{textAlign: 'left', color: '#888'}}>AI is thinking...</p>}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    style={{ flex: 1, padding: '0.5rem', background: '#333', border: '1px solid #555', color: 'white' }}
                    placeholder="Ask about your vehicle..."
                />
                <button onClick={handleSend} disabled={isLoading} style={{ padding: '0.5rem 1rem', background: '#007bff', border: 'none', color: 'white' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;

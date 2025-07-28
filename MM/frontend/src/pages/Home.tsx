import { useState, useEffect } from 'react';

// This is the Home component from your GitHub
const Home = () => {
    const [prediction, setPrediction] = useState('N/A');
    const [confidence, setConfidence] = useState('N/A');

    const generateDummyData = () => ({
        Engine_RPM: 1500 + Math.random() * 500,
        Coolant_Temp_C: 90 + Math.random() * 5,
        Battery_Voltage_V: 13.8 + Math.random() * 0.4,
        Brake_Temp_C: 150 + Math.random() * 50,
        Vehicle_Speed_KPH: 60 + Math.random() * 20,
        Short_Term_Fuel_Trim_Percent: Math.random() * 4 - 2,
    });

    const fetchPrediction = async () => {
        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(generateDummyData()),
            });
            const data = await response.json();
            if (data.error) {
                setPrediction(data.error);
                setConfidence('0');
            } else {
                setPrediction(data.prediction);
                setConfidence(data.confidence);
            }
        } catch (error) {
            console.error("Failed to fetch prediction:", error);
            setPrediction('Connection Error');
            setConfidence('0');
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchPrediction, 2000); // Fetch every 2 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '2rem', color: 'white' }}>
            <h2>Live Diagnostics Dashboard</h2>
            <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px' }}>
                <h3>System Status</h3>
                <p>Predicted Fault: <strong style={{ color: prediction !== 'Normal' ? 'red' : 'green' }}>{prediction}</strong></p>
                <p>Confidence: <strong>{confidence}</strong></p>
            </div>
        </div>
    );
};

export default Home;

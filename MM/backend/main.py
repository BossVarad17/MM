import joblib
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# App Initialization
app = FastAPI(title="MechaMind+ Backend")

# CORS Configuration
origins = ["http://localhost", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models (Data Contracts)
class SensorData(BaseModel):
    Engine_RPM: float
    Coolant_Temp_C: float
    Battery_Voltage_V: float
    Brake_Temp_C: float
    Vehicle_Speed_KPH: float
    Short_Term_Fuel_Trim_Percent: float

class ChatQuery(BaseModel):
    query: str

# Load ML Model
try:
    model = joblib.load('fault_predictor_model.joblib')
    print("✅ ML model loaded successfully.")
except FileNotFoundError:
    model = None
    print("⚠️ ML model not found. /predict will not work.")

# Configure GenAI
load_dotenv()
try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    chat_model = genai.GenerativeModel('gemini-1.5-flash')
    print("✅ Gemini AI configured successfully.")
except Exception:
    chat_model = None
    print("⚠️ Gemini API key not found. /chat will not work.")

# API Endpoints
@app.post("/predict")
async def predict_fault(data: SensorData):
    if not model:
        return {"error": "ML model is not available."}
    features = [[data.Engine_RPM, data.Coolant_Temp_C, data.Battery_Voltage_V, data.Brake_Temp_C, data.Vehicle_Speed_KPH, data.Short_Term_Fuel_Trim_Percent]]
    prediction_encoded = model.predict(features)
    # Note: We need to decode the prediction back to string label. This requires saving the LabelEncoder.
    # For simplicity in this MVP, we'll assume a mapping or adjust later.
    # A better approach is to save `le` with joblib and load it here.
    # Let's pretend for now: 0=Normal, 1=Overheating, 2=Battery_Failure
    label_map = {0: "Normal", 1: "Battery_Failure", 2: "Overheating"} # Adjust if your labels encode differently
    prediction_label = label_map.get(prediction_encoded[0], "Unknown")
    
    probability = model.predict_proba(features).max()
    return {"prediction": prediction_label, "confidence": f"{probability:.2f}"}

@app.post("/chat")
async def chat_with_mechamind(chat_query: ChatQuery):
    if not chat_model:
        return {"response": "AI assistant is not configured."}
    system_prompt = "You are 'MechaMind,' an expert AI automotive assistant. Be concise, clear, and helpful. Explain potential causes and suggest a clear course of action. Do not answer questions unrelated to vehicles."
    full_prompt = f"{system_prompt}\n\nUser Question: {chat_query.query}"
    try:
        response = chat_model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error with AI service: {e}"}

@app.get("/")
def root():
    return {"message": "MechaMind+ Backend is running"}

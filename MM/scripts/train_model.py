import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

print("🚀 Starting model training script...")

# Load the dataset
try:
    df = pd.read_csv('dummy_vehicle_data.csv')
    print("✅ Dataset 'dummy_vehicle_data.csv' loaded.")
except FileNotFoundError:
    print("❌ Error: 'dummy_vehicle_data.csv' not found.")
    print("Please run 'generate_dummy_data.py' first.")
    exit()

# Prepare data
X = df.drop('Fault_Label', axis=1)
y = df['Fault_Label']

# Encode the string labels into numbers
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train the XGBoost Model
print("💪 Training XGBoost model...")
model = xgb.XGBClassifier(objective='multi:softprob', use_label_encoder=False, eval_metric='mlogloss')
model.fit(X_train, y_train)
print("✅ Model training complete.")

# Evaluate the model
preds = model.predict(X_test)
accuracy = accuracy_score(y_test, preds)
print(f"📊 Model Accuracy: {accuracy * 100:.2f}%")

# Save the trained model to the backend directory
output_path = '../backend/fault_predictor_model.joblib'
joblib.dump(model, output_path)
print(f"💾 Model saved successfully to '{output_path}'")

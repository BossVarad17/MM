import pandas as pd
import numpy as np
import datetime

# Configuration
N_SAMPLES = 5000
NORMAL_PERIODS = 4

def generate_normal_data(num_samples):
    data = {
        'Engine_RPM': np.random.normal(loc=1500, scale=300, size=num_samples).clip(800, 3000),
        'Coolant_Temp_C': np.random.normal(loc=90, scale=2, size=num_samples).clip(85, 95),
        'Battery_Voltage_V': np.random.normal(loc=13.8, scale=0.2, size=num_samples).clip(12.8, 14.2),
        'Brake_Temp_C': np.random.normal(loc=150, scale=25, size=num_samples).clip(80, 250),
        'Vehicle_Speed_KPH': np.random.normal(loc=60, scale=15, size=num_samples).clip(0, 120),
        'Short_Term_Fuel_Trim_Percent': np.random.normal(loc=0, scale=2, size=num_samples).clip(-5, 5),
    }
    df = pd.DataFrame(data)
    df['Fault_Label'] = 'Normal'
    return df

def inject_overheating_fault(df, start_index, duration):
    fault_end = start_index + duration
    temp_increase = np.linspace(95, 115, duration)
    df.loc[start_index:fault_end, 'Coolant_Temp_C'] = temp_increase
    df.loc[start_index:fault_end, 'Engine_RPM'] *= 1.1
    df.loc[start_index:fault_end, 'Fault_Label'] = 'Overheating'
    return df

def inject_battery_fault(df, start_index, duration):
    fault_end = start_index + duration
    voltage_drop = np.linspace(12.5, 10.5, duration)
    df.loc[start_index:fault_end, 'Battery_Voltage_V'] = voltage_drop
    df.loc[start_index:fault_end, 'Fault_Label'] = 'Battery_Failure'
    return df

# Generate and Combine Data
df = generate_normal_data(N_SAMPLES)
segment_length = N_SAMPLES // NORMAL_PERIODS
df = inject_overheating_fault(df, start_index=segment_length, duration=300)
df = inject_battery_fault(df, start_index=segment_length * 2, duration=250)

# Save to CSV
output_filename = 'dummy_vehicle_data.csv'
df.to_csv(output_filename, index=False)
print(f"✅ Successfully generated dummy data and saved to '{output_filename}'")

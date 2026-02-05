import pandas as pd
import numpy as np
from datetime import datetime

def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = np.radians(lat1), np.radians(lat2)
    dphi = np.radians(lat2 - lat1)
    dlambda = np.radians(lon2 - lon1)

    a = np.sin(dphi / 2)**2 + np.cos(phi1) * np.cos(phi2) * np.sin(dlambda / 2)**2
    return 2 * R * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

def load_plt(file_path):
    df = pd.read_csv(
        file_path,
        skiprows=6,
        header=None,
        names=['lat','lon','zero','alt','date_days','date','time']
    )
    df['datetime'] = pd.to_datetime(df['date'] + ' ' + df['time'])
    return df[['lat','lon','alt','datetime']]

def extract_features(df):
    if len(df) < 2:
        return None

    distances, times = [], []

    for i in range(1, len(df)):
        d = haversine(
            df.iloc[i-1]['lat'], df.iloc[i-1]['lon'],
            df.iloc[i]['lat'], df.iloc[i]['lon']
        )
        t = (df.iloc[i]['datetime'] - df.iloc[i-1]['datetime']).total_seconds()
        if t > 0:
            distances.append(d)
            times.append(t)

    if not distances:
        return None

    speeds = np.array(distances) / np.array(times)

    return {
        "avg_speed": speeds.mean(),
        "max_speed": speeds.max(),
        "total_distance": sum(distances),
        "stop_ratio": np.sum(speeds < 0.5) / len(speeds)
    }

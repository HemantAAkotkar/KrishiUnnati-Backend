import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId
from math import radians, sin, cos, sqrt, atan2, log
import os
import traceback

# --- 1. Connect to your Live MongoDB Atlas Database ---
# Hardcode your connection string here to ensure it works.
# PASTE YOUR FULL AND CORRECT ATLAS URI IN THE QUOTES BELOW.
MONGO_URI = "mongodb+srv://MyAppUser:myappUser@cluster0.agyxps6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# This print statement will now confirm you are using the correct string.
print(f"--- 🔍 ATTEMPTING TO CONNECT WITH THIS URI: {MONGO_URI} ---")

client = MongoClient(MONGO_URI)
db = client.agriConnect

# --- 2. Fetch Data at Startup ---
try:
    farmers_df = pd.DataFrame(list(db.farmers.find({})))
    buyers_df = pd.DataFrame(list(db.buyers.find({})))
    transactions_df = pd.DataFrame(list(db.transactions.find({})))
    print("✅ Successfully loaded data from MongoDB Atlas.")
except Exception as e:
    print(f"❌ Error connecting to or fetching from MongoDB: {e}")
    exit()


def calculate_distance(loc1, loc2):
    # (The rest of your code remains exactly the same)
    R = 6371
    lat1, lon1 = radians(loc1['coordinates'][1]), radians(loc1['coordinates'][0])
    lat2, lon2 = radians(loc2['coordinates'][1]), radians(loc2['coordinates'][0])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def recommend_buyers_for_farmer(farmer_id: str, product: str, max_distance_km=150):
    try:
        if farmer_id not in farmers_df['farmerId'].values:
            return {"error": f"Farmer with ID {farmer_id} not found."}
            
        target_farmer = farmers_df[farmers_df['farmerId'] == farmer_id].iloc[0]
        farmer_location = target_farmer['location']
        
        potential_buyers = buyers_df[buyers_df['productRequirements'] == product].copy()
        
        scored_buyers = []
        for index, buyer in potential_buyers.iterrows():
            distance = calculate_distance(farmer_location, buyer['location'])
            if distance <= max_distance_km:
                buyer_data = buyer.to_dict()
                buyer_data['distance'] = round(distance, 2)
                buyer_data['proximity_score'] = 1 - (distance / max_distance_km)
                scored_buyers.append(buyer_data)

        if not scored_buyers:
            return []

        for buyer in scored_buyers:
            buyer_id = buyer['buyerId']
            buyer_transactions = transactions_df[transactions_df['buyerId'] == buyer_id]
            if not buyer_transactions.empty:
                avg_rating = buyer_transactions['ratingGivenToBuyer'].mean()
                positive_transactions = buyer_transactions[buyer_transactions['ratingGivenToBuyer'] >= 4]
                trust_score = avg_rating * log(1 + len(positive_transactions))
                volume_score = buyer_transactions[buyer_transactions['productName'] == product]['quantityKg'].sum()
            else:
                trust_score, volume_score = 0, 0
            buyer['trust_score'] = trust_score
            buyer['volume_score'] = volume_score

        max_volume = max(b['volume_score'] for b in scored_buyers) if scored_buyers else 0
        for buyer in scored_buyers:
            buyer['volume_score_normalized'] = buyer['volume_score'] / max_volume if max_volume > 0 else 0
            buyer['final_score'] = (buyer['trust_score'] * 0.5) + (buyer['volume_score_normalized'] * 0.3) + (buyer['proximity_score'] * 0.2)

        recommended_list = sorted(scored_buyers, key=lambda x: x['final_score'], reverse=True)
        
        def clean_data_for_json(buyer_dict):
            cleaned = {}
            for key, value in buyer_dict.items():
                if isinstance(value, ObjectId):  # <-- 2. ADD THIS CHECK
                    cleaned[key] = str(value)
                elif hasattr(value, 'item'):
                    cleaned[key] = value.item()
                else:
                    cleaned[key] = value
            return cleaned

        final_results = [clean_data_for_json(buyer) for buyer in recommended_list[:5]]
        
        return final_results

    except Exception as e:
        print(f"\n--- [CRITICAL ERROR] An exception occurred: {e} ---")
        traceback.print_exc()
        return {"error": "An internal server error occurred.", "details": str(e)}
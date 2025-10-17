from fastapi import FastAPI
from pydantic import BaseModel, Field

# Import the recommendation function from your logic file
from recommend import recommend_buyers_for_farmer

# Create a FastAPI app instance
app = FastAPI(
    title="Krishi Unati Recommendation API",
    description="Provides buyer recommendations for farmers based on location, trust, and volume.",
    version="1.0.0"
)

# Define the input data model for the API request
class FarmerRequest(BaseModel):
    farmer_id: str = Field(..., example="FARMER-101", description="The unique ID of the farmer.")
    product: str = Field(..., example="Tomato", description="The product the farmer is selling.")

# Define the root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Krishi Unati Recommendation API"}

# Define the recommendation endpoint
@app.post("/recommendations/")
async def get_recommendations(request: FarmerRequest):
    """
    This endpoint takes a farmer's ID and product, and returns a ranked list
    of the top 5 most suitable buyers.
    """
    recommendations = recommend_buyers_for_farmer(request.farmer_id, request.product)
    if not recommendations or "error" in recommendations:
        return {"error": "Could not generate recommendations.", "details": recommendations}
        
    return {"top_buyers": recommendations}
import axios from "axios";
import { User } from "../models/userModel";
import { FoodModel } from "../models/foodModel";

interface NGOScore {
  ngoId: string;
  distance: number;
  expiryUrgency: number;
  foodTypeScore: number;
  finalScore: number;
}

/**
 * Main function that ranks NGOs based on distance, expiry, and food type similarity.
 */
export const findBestNGOsForFood = async (foodId: string): Promise<NGOScore[]> => {
  const food = await FoodModel.findById(foodId);
  if (!food) throw new Error("Food not found");

  const ngos = await User.find({ role: "receiver" });

  // Step 1: Prepare location strings for Google API
  const donorLocation = food.location.coordinates.reverse().join(",");
  const ngoLocations = ngos.map(
    (ngo) => ngo.location.coordinates.reverse().join(",")
  );

  // Step 2: Call Google Distance Matrix API
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${donorLocation}&destinations=${ngoLocations.join(
    "|"
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response = await axios.get(apiUrl);
  const distances = response.data.rows[0].elements;

  // Step 3: Score NGOs
  const expiryHours =
    (new Date(food.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60);
  const urgencyWeight = expiryHours <= 6 ? 1.5 : expiryHours <= 12 ? 1.2 : 1;

  const results: NGOScore[] = ngos.map((ngo, index) => {
    const distanceInKm = distances[index].distance.value / 1000;
    const distanceScore = 1 / (distanceInKm + 1); // closer = higher score
    const typeMatch = ((ngo as any).preferences as string[] | undefined)?.includes(food.type) ? 1.2 : 1;

    const finalScore = distanceScore * urgencyWeight * typeMatch;

    return {
      ngoId: ngo.id.toString(),
      distance: distanceInKm,
      expiryUrgency: urgencyWeight,
      foodTypeScore: typeMatch,
      finalScore,
    };
  });

  // Step 4: Sort NGOs by score
  return results.sort((a, b) => b.finalScore - a.finalScore);
};

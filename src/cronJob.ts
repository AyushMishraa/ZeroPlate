import cron from 'node-cron';
import { expiryQueue, matchingEngineQueue } from '../src/queues/queue';
import { FoodModel } from '../src/models/foodModel';

// Runs hourly to check for foods nearing expiration
cron.schedule("0 * * * *", async () => {
    console.log("Running hourly expiry check for food items...");

    const foods = await FoodModel.find({status: "avaialble"});

    foods.forEach((food) => {
        expiryQueue.add('checkExpiry', { foodId: food.id });
    });
});

// Run every 15 minutes to trigger matching engine for new food items
cron.schedule("*/15 * * * *", async () => {
    console.log("Running matching engine for new food items...");

    const foods = await FoodModel.find({ status: "available" });

    foods.forEach((food) => {
        matchingEngineQueue.add('matchNGOs', { foodId: food.id });
    });
});
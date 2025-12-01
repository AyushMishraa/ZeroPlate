import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://localhost:6379',
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => {
    console.log("Connected to Redis successfully");
});

redisClient.connect();

export default redisClient;
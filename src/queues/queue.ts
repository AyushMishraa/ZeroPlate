import { Queue } from 'bullmq';
import  redisConfig from '../config/redis';

export const pickupQueue = new Queue('pickupQueue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

export const expiryQueue = new Queue('expiryQueue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

export const matchingEngineQueue = new Queue('matchingEngineQueue', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

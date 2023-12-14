import { Redis } from "@upstash/redis";

const chatDb = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

module.exports = { chatDb };





// import { Redis } from "@upstash/redis";


// export const chatDb = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL, 
//     token: process.env.UPSTASH_REDIS_REST_TOKEN
// }) 
import arcjet,{tokenBucket,shield,detectBot} from 'arcjet';
import { ENV } from './env.js';


//initialize arcjet with security rules
export const aj = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // shield protects from common attacks like sql injection, xss, csrf etc
        shield({mode:"LIVE"}),
        // bot-detection block all bots except search engine bots
        detectBot({mode:"LIVE",allow:["CATEGORY:SEARCH_ENGINE"]}),
        // rate limiting using token bucket algorithm
        tokenBucket({
            mode:"LIVE",
            refillRate:10, //tokens added per interval
            interval: 10, //interval in seconds (10 seconds)
            capacity: 15, //maximum tokens in bucket
        }),
    ],
})

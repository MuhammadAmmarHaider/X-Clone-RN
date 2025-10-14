import {aj} from '../config/arcjet.js';

// arcjet middleware for rate limiting, bot detection and security

export const arcjetMiddleware = async (req,res,next)=>{
    try{
        const decision = await aj.protect(req,{
            requested:1, // each request consume 1 token
        }); 
        //  handle denied requests  
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({error: 'Too many requests',message:'Rate limit exceeded. Please try again later.'});//429 Too Many Requests
            }
            else if(decision.reason.isBot()){
                return res.status(403).json({error: 'Bot access denied',message:'Automatic requests are not allowed.'});//403 Forbidden
            }
            else{
                return res.status(403).json({error: 'Forbidden',message:'Access denied by security policy.'});//403 Forbidden
            }
        }
        // check for spoofed bots
        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
            return res.status(403).json({
                error:'Sppoofed bot detected',
                message:'Malicious bot activity detected. Access denied.'
            })
        }
        next(); // proceed to next middleware or route handler if allowed
    }
    catch(err){
        console.error('Arcjet middleware error:',err);
        next();   
    }
}

import express from 'express'
import {ENV} from './config/env.js'
import {connectDB} from './config/db.js'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import notificationRoutes from './routes/notification.route.js'
import { arcjetMiddleware } from './middleware/arcjet.middleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arcjetMiddleware) // apply arcjet middleware globally

app.get('/',(req,res)=>{
    res.send('Hello from server')
})

// Handle favicon requests to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
    res.status(204).end()
})

app.get('/favicon.png', (req, res) => {
    res.status(204).end()
})

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications',notificationRoutes)

// error handling middleware
app.use((err,req,res,next)=>{
    console.log("unhandled error: ",err)
    res.status(500).json({error: err.message || 'Internal Server Error'})
})

const startServer = async()=>{
    try{
        await connectDB()
        // Only listen for local development
        if(ENV.NODE_ENV !== 'production'){
            const PORT = ENV.PORT || 5001;
            app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
        }
    }
    catch(err){
        console.log("Failed to start server: ",err)
        if(ENV.NODE_ENV !== 'production'){
            process.exit(1)
        }
    }
}

// Initialize database connection
if(ENV.NODE_ENV !== 'production'){
    startServer()
} else {
    // For Vercel, connect to DB on first request
    connectDB().catch(err => console.error("Database connection failed:", err))
}

// export for vercel deployment
export default app;

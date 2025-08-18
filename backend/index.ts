import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser';
import connectDb from './config/dbConnect';
import authRoutes from './routes/authRouter';
import productRoutes from './routes/productRoute';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credential: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookiesParser());

connectDb();

//api endpoint
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)

app.listen(PORT, ()=>{
	console.log(`listening on port ${PORT}`);
})


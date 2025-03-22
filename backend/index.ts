import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { Connect } from './database/connect.database.ts';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}

app.use(cors(corsOptions));

// Test

if(process.env.NODE_ENV === 'development'){
    app.get('/', (req,res) => {
        res.send('Hello World');
    })
}

// Test

// Routes

import { MainRouter } from './route/index.ts';

app.use('/api', MainRouter);

// Routes

app.listen(process.env.PORT, () => {
    Connect();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
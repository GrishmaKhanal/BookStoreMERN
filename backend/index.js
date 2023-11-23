import  express, { response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Policy -> Cross-Origin Resource Sharing
// Middleware for handling CORS Policy
app.use(cors(
    {
        origin: 'http://localhost:5555/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }
));


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome From Backend")
});

app.use('/book', booksRoute);

mongoose.connect(MONGO_URI)
        .then(() => {
    console.log("Connected to MongoDB");

    // runs the server only when connection can be established
    app.listen(PORT, () => {
        console.log(`App listening to port: ${PORT}`);
    });
})
.catch((error) => {
        console.log(error);
});

// Cors Policy, Need React
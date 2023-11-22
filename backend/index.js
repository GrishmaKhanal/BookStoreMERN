import  express, { response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

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
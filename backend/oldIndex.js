import  express, { response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from "./config.js";
import { Book } from "./models/bookModel.js";


const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome From Backend")
});

// Route to save new book
app.post('/book', async (request, response) => {
    try {
        if (!request.body.title||
        !request.body.author||
        !request.body.publishYear)
        {
            return response.status(400).send({
                message: "Required field(s) missing"
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).json({
            status: "Book Created Successfully",
            data: book,
        });

    }catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get all books
app.get('/book', async (request, response) => {
    try {
        const books = await Book.find();
        return response.status(200).json({
            count: books.length,
            data: books,
        });

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get book by id
app.get('/book/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json({
            data: book,
        })
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// update a book
app.put('/book/:id', async (request, response) => {
    try{
        if (!request.body.title||
            !request.body.author||
            !request.body.publishYear)
            {
                return response.status(400).send({
                    message: "Required field(s) missing"
                });
            }
        const { id } = request.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedBook = await Book.findByIdAndUpdate(objectId, request.body);

        if(!updatedBook){
            return response.status(404).json({message: 'Book Not Found'});
        }

        return response.status(200).json({
            status: "Book Updated Sucessfully!",
            data: updatedBook,
        })

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// delete a book
app.delete('/book/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedBook = await Book.findByIdAndDelete(objectId);

        if(!updatedBook){
            return response.status(404).json({message: 'Book Not Found'});
        }

        return response.status(200).json({
            status: "Book Deleted Successfully!",
        })

    }catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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
import express from 'express';
import { Book } from '../models/bookModel.js';
import mongoose from 'mongoose';

const router = express.Router();


// Route to save new book
router.post('/', async (request, response) => {
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
            data: book});

    }catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get all books
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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
        response.status(500).send({messageFromDeleteRoute: error.message});
    }
});

export default router;
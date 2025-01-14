// import express from "express";
// import { bookSchema } from "../models/book.model";

// export const router = express.Router();

// //MIDDLEWARE
// //para poder utilizar un solo libro para utilizarlo em las otras llamadas

// const getBook = async (req, res, next) => {
//   let book;
//   const { id } = req.params;

//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     return res.status(404).json({ message: "id no es valido" });
//   }
//   try {
//     //(1) si lo encontro
//     book = await bookSchema.findById(id);
//     //(2) no salio undefined
//     if (!book) {
//       return res.status(404).json({
//         message: " El Libro No fue Encontrado",
//       });
//     }
//     //(3) y no salio por el catch
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
//   //ahi si seguimos
//   res.book = book;
//   next();
// };

// //obtener todos los libros
// // (/) solo la barra, porque books ya va estar en la url principal
// router.get("/", async (req, res) => {
//   try {
//     //find es encontrar
//     const books = await bookSchema.find();
//     console.log(books, "books");
//     if (books.length === 0) {
//       return res.status(204).json([]);
//     }
//     res(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // crearun nuevo libro (recurso) 

// router.post("/", async (req, err) => {
//   const { title, author, genre, publication_date } = req?.body;
//   if (title || author || genre || publication_date) {
//     return res.status(400).json({ message: "los campos son obligatorios" });
//   }
// });

// const bookSchema = new Book({ title, author, genre, publication_date });

// try {
//   const newBook = await bookSchema.save();
//   res.status(201).json({ message: newBook });
// } catch (error) {
//   res.status(400).json({ message: error.message });
// }


import express from 'express';
import  bookSchema  from '../models/book.model.js';

const router = express.Router();

// Middleware para obtener un libro por su ID
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: 'ID no válido' });
  }

  try {
    book = await bookSchema.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'El libro no fue encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
};

// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await bookSchema.find();
    console.log(books, "books");
    
    if (books.length === 0) {
      return res.status(204).json([]);
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo libro
router.post('/', async (req, res) => {
  const { title, author, genre, publication_date } = req.body;

  if (!title || !author || !genre || !publication_date) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const newBook = new bookSchema({
    title,
    author,
    genre,
    publication_date
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}); 



router.get('/:id', getBook, async(req, res) => {
  res.json(res.book)
})

router.put('/:id', getBook, async(req, res) => {
 try {
  const book = res.book
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.publication_date = req.body.publication_date || book.publication_date;

    const updateBook = await book.save();
    res.json(updateBook);
 } catch (error) {
  res.status(400).json({message: error.message})
 }
})



router.patch('/:id', getBook, async(req, res) => {

  if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date  ) {
    res.status(400).json({
      message: "debe existir al menos un campo"
    })
  }
  try {
   const book = res.book
     book.title = req.body.title || book.title;
     book.author = req.body.author || book.author;
     book.genre = req.body.genre || book.genre;
     book.publication_date = req.body.publication_date || book.publication_date;
 
     const updateBook = await book.save();
     res.json(updateBook);
  } catch (error) {
   res.status(400).json({message: error.message}) 
  }
 })


 router.delete('/:id', getBook, async(req, res) => {
  try {
    const book = res.book;
    await res.book.deleteOne({
      _id: book._id
    });
    res.json({
      message: "libtro eliminado"
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
 } )
export default router;
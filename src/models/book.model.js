import mongoose from "mongoose";

// Definir el esquema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publication_date: { type: Date, required: true },
});

// Crear y exportar el modelo basado en el esquema
const Book = mongoose.model("Book", bookSchema);
export default Book;

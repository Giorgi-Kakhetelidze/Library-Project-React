import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import booksWithPhotos from "../data/booksWithPhotos.json";

function BooksPage() {
  const { id } = useParams(); // Get the id from the URL
  const book = booksWithPhotos.items.find((item) => item.id === id); // Find the book directly

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!book) {
    return <h2>Book not found.</h2>; // Handle book not found
  }

  return (
    <div className='book-details container'>
      <div className='getBack'>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
            window.history.back(); // Go back to the previous page
          }}
        >
          უკან დაბრუნება
        </button>
      </div>
      <h1>{book.volumeInfo.title}</h1>
      <div className='details-container'>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x195.png?text=No+Image"
          }
          alt={book.volumeInfo.title}
        />
        <div className='text-info'>
          <div>
            <h2>Desciption:</h2>
            <p>{book.volumeInfo.description}</p>
          </div>
          <div className='author'>
            <h3>Authors:</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </div>
          <div className='author'>
            <h3>Publish Date:</h3>
            <p>{book.volumeInfo.publishedDate}</p>
          </div>
          <div className='author'>
            <h3>Categories:</h3>
            <p>{book.volumeInfo.categories?.join(", ")}</p>
          </div>
          <div className='author'>
            <h3>Language: </h3>
            <p>{book.volumeInfo.language}</p>
          </div>
          <div className='author'>
            <h3>Page Count: </h3>
            <p>{book.volumeInfo.pageCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;

import React, { useState, useEffect } from "react";
import booksData from "../data/books.json";
import searchIcon from "../icons/search.png";



function Books() {
  // scroll to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [books, setBooks] = useState(booksData);
  const [originalBooks] = useState(booksData);
  const [newBook, setNewBook] = useState({
    title: "",
    publisher: "",
    publicationYear: "",
    authors: "",
  });

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // for filtering by range of years

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const clearFilter = () => {
    setBooks(originalBooks);
    setStartYear("");
    setEndYear("");
    setCurrentPage(1); // Reset to first page
  };

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const toggleAdd = () => {
    setAdd((prev) => !prev);
  };

  const addBook = () => {
    if (
      !newBook.title ||
      !newBook.publisher ||
      !newBook.publicationYear ||
      !newBook.authors
    ) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    setBooks([...books, { ...newBook, id: books.length + 1 }]);
    setNewBook({ title: "", publisher: "", publicationYear: "", authors: "" });
    setAdd(false);
    setCurrentPage(1); // Reset to first page after adding a book
  };

  const filterBooks = (event) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setBooks(originalBooks);
    } else {
      setBooks(
        originalBooks.filter((f) => f.title.toLowerCase().includes(query))
      );
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  

  const filterBooksByYear = () => {
    const start = parseInt(startYear, 10);
    const end = parseInt(endYear, 10);

    if (!startYear || !endYear) {
      alert("გთხოვთ შეავსოთ ორივე წელი.");
      return;
    }

    const filteredBooks = originalBooks.filter((book) => {
      const year = parseInt(book.publication_year, 10);
      return year >= start && year <= end;
    });
    setBooks(filteredBooks);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const openEditModal = (index) => {
    setCurrentIndex(index);
    setNewBook(books[index]);
    setEdit(true);
  };

  const openDeleteModal = (index) => {
    setCurrentIndex(index);
    setRemove(true);
  };

  const handleDelete = () => {
    const filteredBooks = books.filter((book, i) => i !== currentIndex);
    setBooks(filteredBooks);
    setRemove(false);
  };

  const updateBook = () => {
    if (
      !newBook.title ||
      !newBook.publisher ||
      !newBook.publicationYear ||
      !newBook.authors
    ) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    const updatedBooks = books.map((book, index) =>
      index === currentIndex ? { ...newBook, id: book.id } : book
    );
    setBooks(updatedBooks);
    setEdit(false);
    setNewBook({ title: "", publisher: "", publicationYear: "", authors: "" });
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='books-container'>
      {/* Add Book Modal */}
      <div className={add ? "modal-container active" : "modal-container"}>
        <div className='modal'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addBook();
            }}
          >
            <div>
              <input
                type='text'
                placeholder='წიგნის დასახელება'
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
                maxLength='50'
              />
              <input
                type='text'
                placeholder='გამომცემლობა'
                value={newBook.publisher}
                onChange={(e) =>
                  setNewBook({ ...newBook, publisher: e.target.value })
                }
                required
                maxLength='50'
              />
              <input
                type='number'
                placeholder='გამოცემის წელი'
                value={newBook.publicationYear}
                onChange={(e) =>
                  setNewBook({ ...newBook, publicationYear: e.target.value })
                }
                required
              />
              <input
                type='text'
                placeholder='ავტორები'
                value={newBook.authors}
                onChange={(e) =>
                  setNewBook({ ...newBook, authors: e.target.value })
                }
                required
              />
              <div className='buttons'>
                <button
                  type='button'
                  className='delete-btn2'
                  onClick={() => setAdd(false)}
                >
                  X
                </button>
                <button type='submit' className='add-btn2'>
                  დამატება
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Book Modal */}
      <div className={remove ? "modal-container active" : "modal-container"}>
        <div className='modal delete-modal'>
          <h2>Are you sure you want to delete?</h2>
          <div className='confirmation-buttons'>
            <button className='yes' onClick={handleDelete}>
              Yes
            </button>
            <button className='no' onClick={() => setRemove(false)}>
              No
            </button>
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      <div className={edit ? "modal-container active" : "modal-container"}>
        <div className='modal'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateBook();
            }}
          >
            <div>
              <input
                type='text'
                placeholder='წიგნის დასახელება'
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                type='text'
                placeholder='გამომცემლობა'
                value={newBook.publisher}
                onChange={(e) =>
                  setNewBook({ ...newBook, publisher: e.target.value })
                }
                required
              />
              <input
                type='number'
                placeholder='გამოცემის წელი'
                value={newBook.publicationYear}
                onChange={(e) =>
                  setNewBook({ ...newBook, publicationYear: e.target.value })
                }
                required
              />
              <input
                type='text'
                placeholder='ავტორები'
                value={newBook.authors}
                onChange={(e) =>
                  setNewBook({ ...newBook, authors: e.target.value })
                }
                required
              />
              <div className='buttons'>
                <button
                  className='delete-btn2'
                  type='button'
                  onClick={() => setEdit(false)}
                >
                  X
                </button>
                <button className='add-btn2' type='submit'>
                  განახლება
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='header'>
        <h2>წიგნების კატალოგი</h2>
        <div className='input-add-part book-input-add-part'>
          <div className='filter-by-year'>
            <input
              type='number'
              placeholder='დაწყების წელი'
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className='year-input'
            />
            <input
              type='number'
              placeholder='დამთავრების წელი'
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className='year-input'
            />
            <button onClick={filterBooksByYear}>ფილტრაცია</button>
            <button onClick={clearFilter}>გასუფთავება</button>
          </div>
          <div className="search-input">
            <div className="input">
              <input type='text' onChange={filterBooks} placeholder='ძიება...' />
              <img src={searchIcon} alt='searchIcon' />
            </div>
            <button onClick={toggleAdd}>დამატება</button>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <table border='1'>
        <thead>
          <tr>
            <th>წიგნის დასახელება</th>
            <th>გამომცემლობა</th>
            <th>გამოცემის წელი</th>
            <th>ავტორები</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.publisher}</td>
              <td>{book.publication_year}</td>
              <td className='authors-td'>
                {book.authors}
                <div className='buttons'>
                  <button
                    className='delete-btn'
                    onClick={() => openDeleteModal(index + indexOfFirstBook)}
                  >
                    X
                  </button>
                  <button
                    className='edit-btn'
                    onClick={() => openEditModal(index + indexOfFirstBook)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Books;

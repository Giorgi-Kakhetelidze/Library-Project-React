import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import booksWithPhotos from "../data/booksWithPhotos.json";
import searchIcon from "../icons/search.png";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12; // Show 12 books per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooks(booksWithPhotos.items || []);
        setRecords(booksWithPhotos.items || []);
      } catch (err) {
        setError("Failed to load books data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const Filter = (event) => {
    const query = event.target.value.toLowerCase();
    setRecords(
      books.filter((f) => f.volumeInfo.title.toLowerCase().includes(query))
    );
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

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

  // Scroll to the top when the current page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) return <h2 className='resp'>იტვირთება...</h2>;
  if (error) return <h2 className='resp'>{error}</h2>;

  return (
    <div className='books container'>
      <div className='book-search'>
        <div className="input booksInput">
          <input type='text' onChange={Filter} placeholder='ძიება...' />
          <img src={searchIcon} alt='searchIcon' />
        </div>
      </div>

      <ul className='container'>
        {currentRecords.map((book) => (
          <li key={book.id}>
            <Link to={`/booksPage/${book.id}`}>
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/128x195.png?text=No+Image"
                }
                alt={book.volumeInfo.title}
                className='ratio-img'
              />
              <div className='info'>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

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

export default Home;



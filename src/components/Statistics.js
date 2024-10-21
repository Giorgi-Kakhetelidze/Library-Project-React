import React, { useEffect, useState } from "react";
import statisticsData from "../data/statistics.json";

function Statistics() {
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [statics, setStatics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Number of items to display per page

  useEffect(() => {
    setStatics(statisticsData);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(statics.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = statics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="statics container">
      <h1>სტატიკური მოდელი</h1>

      <table border="1" className="static-table">
        <thead>
          <tr>
            <th>სახელი</th>
            <th>გვარი</th>
            <th>წიგნების რაოდენობა</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td className="nums-td">{item.booksWritten}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="prev-btn"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Statistics;

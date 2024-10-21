import React, { useState, useEffect } from "react";
import authorsData from "../data/authors.json";
import searchIcon from "../icons/search.png";


function Authors() {
  
  // scroll to the top 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const [authors, setAuthors] = useState(authorsData);
  const [originalAuthors] = useState(authorsData); 
  const [newAuthor, setNewAuthor] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    cv: "",
  });
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  
  // state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 6;

  const editAdd = () => {
    setAdd((prev) => !prev);
  };

  const addAuthor = () => {
    const newAuthorsList = [...authors, { ...newAuthor, id: authors.length + 1 }];
    setAuthors(newAuthorsList);
    setNewAuthor({ firstName: "", lastName: "", birthDate: "", cv: "" });
    setAdd(false);
    // Reset to page 1 when adding a new author
    setCurrentPage(1);
  };

  // for search input tag 
  const filterAuthors = (event) => {
    const query = event.target.value.toLowerCase();
    
    if (query === "") {
      setAuthors(originalAuthors); 
    } else {
      setAuthors(
        originalAuthors.filter((f) => f.firstName.toLowerCase().includes(query))
      );
    }
    // Reset to page 1 after filtering
    setCurrentPage(1);
  };

  const deleteAuthor = () => {
    const filteredAuthors = authors.filter((author, i) => i !== currentIndex);
    setAuthors(filteredAuthors);
    setRemove(false);  
  };

  const openEditModal = (index) => {
    setCurrentIndex(index);
    setNewAuthor(authors[index]);
    setEdit(true);
  };

  const openDeleteModal = (index) => {
    setCurrentIndex(index);
    setRemove(true); 
  };

  const updateAuthor = () => {
    const updatedAuthors = authors.map((author, index) =>
      index === currentIndex ? { ...newAuthor, id: author.id } : author
    );
    setAuthors(updatedAuthors);
    setEdit(false);
    setNewAuthor({ firstName: "", lastName: "", birthDate: "", cv: "" });
  };

  // Calculate the current authors to display
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  // Calculate total pages
  const totalPages = Math.ceil(authors.length / authorsPerPage);

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
    <div className='authors-container'>
      {/* Add Author Modal */}
      <div className={add ? "modal-container active" : "modal-container"}>
        <div className='modal'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addAuthor();
            }}
          >
            <div>
              <input
                type='text'
                placeholder='სახელი'
                value={newAuthor.firstName}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, firstName: e.target.value })
                }
                required
                maxLength='30'
              />
              <input
                type='text'
                placeholder='გვარი'
                value={newAuthor.lastName}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, lastName: e.target.value })
                }
                required
                maxLength='30'
              />
              <input
                type='date'
                placeholder='დაბადების თარიღი'
                value={newAuthor.birthDate}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, birthDate: e.target.value })
                }
                required
              />
              <input
                type='file'
                className="custom-upload-btn"
                onChange={(e) =>
                  setNewAuthor({
                    ...newAuthor,
                    cv: e.target.files[0]?.name || "",
                  })
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

      {/* Delete Author Modal */}
      <div className={remove ? "modal-container active" : "modal-container"}>
        <div className="modal delete-modal">
          <h2>Are you sure you want to delete?</h2>
          <div className="confirmation-buttons">
            <button className="yes" onClick={deleteAuthor}>Yes</button>
            <button className="no" onClick={() => setRemove(false)}>No</button>
          </div>
        </div>
      </div>

      {/* Edit Author Modal */}
      <div className={edit ? "modal-container active" : "modal-container"}>
        <div className='modal'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateAuthor();
            }}
          >
            <div>
              <input
                type='text'
                placeholder='სახელი'
                value={newAuthor.firstName}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, firstName: e.target.value })
                }
              />
              <input
                type='text'
                placeholder='გვარი'
                value={newAuthor.lastName}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, lastName: e.target.value })
                }
              />
              <input
                type='date'
                placeholder='დაბადების თარიღი'
                value={newAuthor.birthDate}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, birthDate: e.target.value })
                }
              />
              <input
                type='file'
                className="custom-upload-btn"
                onChange={(e) =>
                  setNewAuthor({
                    ...newAuthor,
                    cv: e.target.files[0]?.name || "",
                  })
                }
              />
              <div className='buttons'>
                <button
                  type='button'
                  className='delete-btn2'
                  onClick={() => {
                    setEdit(false);
                    setNewAuthor({
                      firstName: "",
                      lastName: "",
                      birthDate: "",
                      cv: "",
                    });
                  }}
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
        <h2>ავტორების კატალოგი</h2>
        <div className='input-add-part'>
          <div className="input">
            <input type='text' onChange={filterAuthors} placeholder='ძიება...' />
            <img src={searchIcon} alt='searchIcon' />
          </div>
          <button onClick={editAdd}>დამატება</button>
          
        </div>
      </div>

      {/* Authors Table */}
      <table border='1'>
        <thead>
          <tr>
            <th>სახელი</th>
            <th>გვარი</th>
            <th>დაბადების თარიღი</th>
            <th>CV</th>
          </tr>
        </thead>

        <tbody>
          {currentAuthors.map((author, index) => (
            <tr key={index}>
              <td data-label="სახელი">{author.firstName}</td>
              <td data-label="გვარი">{author.lastName}</td>
              <td data-label="დაბადების თარიღი">{author.birthDate}</td>
              <td data-label="CV" className="cv-td">
                <a>{author.cv}</a>
                <div className="buttons">
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(index + indexOfFirstAuthor)}
                  >
                    X
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(index + indexOfFirstAuthor)}
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
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Authors;

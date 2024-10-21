import React, { useRef } from "react"; // Import useRef
import Home from "./components/Home";
import '../src/Main.css';
import Authors from './components/Authors';
import Books from "./components/Books";
import Header from './components/Header';
import Statistics from './components/Statistics';
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RecoverPassword from "./components/RecoverPassword";
import BooksPage from "./components/BooksPage";

function App() {
  return <Main />; // Keep this line as is
}
function Main() {
  const location = useLocation(); 
  const nodeRef = useRef(null); 

  return (
    <div className="App">
      <Header />
      <TransitionGroup>
        <CSSTransition
          nodeRef={nodeRef}
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <div ref={nodeRef}> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/authors' element={<Authors />} />
              <Route path='/books' element={<Books />} />
              <Route path='/statistics' element={<Statistics />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/recover' element={<RecoverPassword />} />
              <Route path="/booksPage/:id" element={<BooksPage />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}


export default App;

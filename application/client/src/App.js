import './App.css';
import Home from "./pages/Home";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position='top-center' autoClose='2000'/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Compositions from './Compositions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from '../utils/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/:compositionId' element={<Body />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/compositions' element={<Compositions />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer />
      </div>
    </AuthContextProvider>
  );
}

export default App;

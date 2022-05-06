import './App.css';
import './components/SignUpPage.css';
import SignUp from './components/SignUpPage.js';
//import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import BookCard  from './components/BookARide';
import OptionsPage from './components/OptionsPage';
import Counter from './components/timepass.js'
import {BrowserRouter,Route , Routes,} from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/options" element={<OptionsPage />} />
      <Route exact path="/Booking" element={<BookCard/>} />
      <Route exact path="/timepass" element={<Counter />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
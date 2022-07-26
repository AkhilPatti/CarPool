import './App.css';
import './components/SignUpPage.css';
import SignUp from './components/SignUpPage.js';
import AboutRide from './components/AboutRide.js';
import Appla from './components/bla.js';
//import SignUpPage from './components/SignUpPage';
import History from './components/History.js';
import LoginPage from './components/LoginPage';
import BookCard  from './components/BookARide';
import OptionsPage from './components/OptionsPage';
import Counter from './components/timepass.js'
import  RideCard  from './components/RideCard';
import {BrowserRouter,Route , Routes,} from 'react-router-dom';
import HomePic from './components/HomePic.js';
import NoteState from './context/State.js';
import DialogueBox from './components/DailogueBox';
import Profile from './components/Profile';
function App() {
  return (
    <NoteState>
    <div>
    
    <BrowserRouter>
      <Routes>
      <Route exact path="/dial" element={<DialogueBox />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/bla" element={<Appla/>} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/options" element={<OptionsPage />} />
      <Route exact path="/Booking/OfferARide" element={<BookCard type="Offer a Ride"/>} />
      <Route exact path="/Booking/BookARide" element={<BookCard type="Book a Ride"/>} />
      <Route exact path="/timepass" element={<Counter />} />
      <Route exact path="/components" element={<HomePic />} />
      <Route exact path="/RideCards" element={<RideCard/>}/>
      <Route exact path="/AboutRide" element={<AboutRide/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route exact path="/history" element={<History/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    </NoteState>
  );
}
export default App;
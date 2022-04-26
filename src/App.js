import './App.css';
import './components/SignUpPage'
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import {BrowserRouter,Route , Routes,} from 'react-router-dom';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route exact path="/signup" element={<SignUpPage/>}/>
        <Route exact path="/login" element={<LoginPage />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
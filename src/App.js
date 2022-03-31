import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './components/Pages/RegistrationPage';
import Header from './components/RegistrationPage/Header/Header';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/' element={<RegistrationPage />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;

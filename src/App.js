import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/Pages/RegistrationPage";
// import AuthorizationPage from './components/Pages/AuthorizationPage';
import Header from "./components/RegistrationPage/Header/Header";
// import MainPage from './components/MainPage/MainPage';
// import Table from './././components/MainPage/Table';
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          {/* <Route path='/authorization' element={<AuthorizationPage />} />
          <Route path='/mainPage' element={<MainPage />} />
          <Route path='/table' element={<Table />} /> */}
          <Route path="/" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
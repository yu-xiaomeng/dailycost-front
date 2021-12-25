import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/pages/home';
import Login from './components/pages/login';
import BillList from "./components/pages/billList";
import Me from "./components/pages/me";

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/billList' element={<BillList/>}/>
          <Route path='/me' element={<Me/>}/>
        </Routes>
    </Router>
  );
}

export default App;

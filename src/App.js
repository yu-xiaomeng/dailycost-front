import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/pages/home';
import Login from './components/pages/login';
import BillList from "./components/pages/billList";

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/billList' element={<BillList/>}/>
        </Routes>
    </Router>
  );
}

export default App;

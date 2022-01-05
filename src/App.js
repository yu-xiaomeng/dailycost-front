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
import BillDetail from "./components/pages/billDetail";
import EditBill from "./components/pages/editBill";
import YearlyBill from "./components/pages/yearlyBill";

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/billList' element={<BillList/>}/>
          <Route path='/me' element={<Me/>}/>
          <Route path='/bill/:id' element={<BillDetail />}/>
          <Route path='/bill/new' element={<EditBill />}/>
          <Route path='/bill/yearly' element={<YearlyBill />}/>
        </Routes>
    </Router>
  );
}

export default App;

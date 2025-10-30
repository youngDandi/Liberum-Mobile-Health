
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from './Views/Landing/LandingPage.jsx';
import Login from './Views/Login/Login.jsx';
import SignUp from './Views/SignUp/SignUp.jsx';
import InvestorForm from './Views/InvestorForm/InvestorForm.jsx';
import Home from './Views/Home/Home.jsx';
import Cryptocurrencies from './Views/Cryptocurrencies/Cryptocurrencies.jsx';
import Settings from './Views/Settings/Settings.jsx';
import Product from './Views/Product/Product.jsx';
import Consultas from './Views/Consultas/Consultas.jsx';
import Stocks from './Views/Stocks/Stocks.jsx';
import StockProduct from './Views/StockProduct/StockProduct.jsx';
import Indexes from './Views/Indexes/Indexes.jsx';
import IndexesProduct from './Views/IndexesProduct/indexesProduct.jsx';
import ViewConsulta from './Views/ViewConsulta/ViewConsulta.jsx';
import ChatBot from './Views/Chatbot/Chatbot.jsx';

import { AuthProvider } from '../../Frontend/src/hooks/AuthContext.jsx';


function App() {
  

  return (
    <div >
      <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />}/>
        
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/InvestorForm' element={<InvestorForm />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Cryptocurrencies' element={<Cryptocurrencies />}/>
          <Route path='/Indexes' element={<Indexes />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/crypto/:id' element={<Product />} />
          <Route path='/stocks/:id' element={<StockProduct />} />
          <Route path='/indexes/:id' element={<IndexesProduct />} />
          <Route path='/Consultas' element={<Consultas />} />
          <Route path='/Stocks' element={<Stocks />} />
          <Route path='/ViewConsulta/:id' element={<ViewConsulta />} />
          <Route path='/ChatBot' element={<ChatBot/>} />
        </Routes>
      </AuthProvider>  
      </Router>
    </div>
  )
}

export default App;

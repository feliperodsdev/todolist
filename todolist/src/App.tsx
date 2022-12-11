import React, {useState, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Header} from './componentes/reusable/Header'
import {Sign} from './componentes/Login/Sign'
import { Error404 } from './componentes/reusable/404';
import {Main} from './componentes/Home/Main'
import { PrivateRoute } from './componentes/utils/utils';

export const AppContext = createContext<any>([]);

function App() {
  const [optionUser, setOptionUser] = useState<boolean>(true);  
  return (
    <AppContext.Provider value={{optionUser, setOptionUser}}>
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Sign/>}></Route>
        <Route path="/home" element={
          <PrivateRoute>
          <Main/>
          </PrivateRoute>
        }></Route>
        <Route path="*" element={<Error404/>}></Route>
      </Routes>
    </Router>
    </AppContext.Provider>
  );
}

export default App;

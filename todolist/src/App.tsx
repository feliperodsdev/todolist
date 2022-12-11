import React, {useState, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Header} from './componentes/reusable/Header'
import {Sign} from './componentes/Login/Sign'
import { Error404 } from './componentes/reusable/404';
import {Main} from './componentes/Home/Main'
import { PrivateRoute } from './componentes/utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const AppContext = createContext<any>([]);

function App() {
  const [optionUser, setOptionUser] = useState<boolean>(true);  
  
  const showNotify = (msg:string, status:string) => 
  {
      if(status == 'error')
      {
        toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      else if(status == 'success')
      {
        toast.success(msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
  }

  return (
    <AppContext.Provider value={{optionUser, setOptionUser, showNotify}}>
    <Router>
      <Header></Header>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /><ToastContainer/>
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

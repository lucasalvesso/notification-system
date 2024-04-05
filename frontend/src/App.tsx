import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Users from "./components/users/Users";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Logs from "./components/notifications/Logs";
import Message from "./components/message/Message";

function App() {
  return (
      <>
          <Navbar></Navbar>
          <div className="content">
              <Routes>
                  <Route path="/"  element={<Home/>} />
                  <Route path="/users"  element={<Users />}/>
                  <Route path="/logs"  element={<Logs />}/>
                  <Route path="/message"  element={<Message />}/>
              </Routes>

          </div>
      </>
  );
}

export default App;

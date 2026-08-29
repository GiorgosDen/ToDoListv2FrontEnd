import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
//import Layouts
import LogSignLayout from './LogSignLayout'
import Layout from './Layout'
//Import pages
import LoginPage from './pages/LoginPage/LoginPage'
import SignUp from './pages/SignUp/SignUp'
import MainPage from './pages/Home/MainPage'
import CreateNewTask from './pages/AddTask/CreateNewTask'
import TaskPage from './pages/TaskPage/TaskPage'
import './App.css'
import './index.css'

function App() {
  return(
    <BrowserRouter basename="/">
      <Routes>
          <Route path="/" element={<LogSignLayout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
          </Route>
          <Route path="/home" element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path="addNewTask" element={<CreateNewTask/>}/>
            <Route path="taskPage/:taskId" element={<TaskPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

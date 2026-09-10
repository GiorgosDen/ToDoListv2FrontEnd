import { useEffect, useState } from 'react'
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
import TermsOfService from './pages/TermsAndPolicy/TermsOfService'
import PrivacyPolicy from './pages/TermsAndPolicy/PrivacyPolicy'
import './App.css'
import './index.css'
import ErrorMessagePopUp from './components/ErrorMessagePopUp'
import { setGlobalServerErrorHandler } from './services/apiClient'

function App() {
  //ErrorMessagePopUp States
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpData, setPopUpData] = useState({
    title:"A server-side error",
    description:"A server issue during API calls",
    iconPath:"",
    iconColor:"",
    buttonMessage:"Close"
  });

  const triggerServerSideError = (data)=>{
    console.log(`Change PopUp visibility:${popUpVisible}`)
    setPopUpData(data);
    setPopUpVisible(true);
  }

  useEffect(()=>{
    setGlobalServerErrorHandler(triggerServerSideError);
  },[]);

  return(
    <BrowserRouter basename="/">
      <Routes>
          <Route path='/terms' element={<TermsOfService/>}/>
          <Route path='/policy' element={<PrivacyPolicy/>}/>
          <Route path="/" element={<LogSignLayout triggerServerSideError={triggerServerSideError}/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
          </Route>
          <Route path="/home" element={<Layout triggerServerSideError={triggerServerSideError}/>}>
            <Route index element={<MainPage/>}/>
            <Route path="addNewTask" element={<CreateNewTask/>}/>
            <Route path="taskPage/:taskId" element={<TaskPage/>}/>
          </Route>
        </Routes>
        <ErrorMessagePopUp
          title={popUpData.title}
          description={popUpData.description}
          iconPath={popUpData.iconPath}
          iconColor={popUpData.iconColor}
          buttonMessage={popUpData.buttonMessage}
          seePopUp={popUpVisible}
          onClose={()=>setPopUpVisible(false)}/>
      </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
import UserPage from './pages/UserPage/UserPage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'
import TaskCategoryPage from './pages/TaskCategory/TaskCategoryPage'

function App() {
  //ErrorMessagePopUp States
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpData, setPopUpData] = useState({
    status:0,
    title:"A server-side error",
    description:"A server issue during API calls",
    iconPath:"",
    iconColor:"",
    buttonMessage:"Close"
  });

  const triggerPopUpMessage = (data)=>{
    console.log(`Change PopUp visibility:${popUpVisible}`);
    //console.log(data);
    setPopUpData(data);
    setPopUpVisible(true);
  }

  const closePopUpMessage= (status)=>{
    console.log(`Change PopUp visibility:false`);
    console.log(status);
    setPopUpVisible(false);
    if(status===403) window.location.href = "/";;
  }

  useEffect(()=>{
    console.log("Handler registered");
    setGlobalServerErrorHandler(triggerPopUpMessage);
  },[]);

  return(
    <BrowserRouter basename="/">
      <Routes>
          <Route path='/terms' element={<TermsOfService/>}/>
          <Route path='/policy' element={<PrivacyPolicy/>}/>
          <Route path="/" element={<LogSignLayout triggerPopUpMessage={triggerPopUpMessage}/>}>
            <Route index element={<LoginPage/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
          </Route>
          <Route path="/home" element={<Layout triggerPopUpMessage={triggerPopUpMessage}/>}>
            <Route index element={<MainPage/>}/>
            <Route path="addNewTask" element={<CreateNewTask/>}/>
            <Route path="taskPage/:taskId" element={<TaskPage/>}/>
            <Route path="userSettings" element={<UserPage/>}/>
            <Route path="statistics" element={<StatisticsPage/>}/>
            <Route path="taskCategory" element={<TaskCategoryPage/>}/>
          </Route>
        </Routes>
        <ErrorMessagePopUp
          title={popUpData.title}
          description={popUpData.description}
          iconPath={popUpData.iconPath}
          iconColor={popUpData.iconColor}
          buttonMessage={popUpData.buttonMessage}
          seePopUp={popUpVisible}
          onClose={()=>closePopUpMessage(popUpData.status)}/>
      </BrowserRouter>
  );
}

export default App;

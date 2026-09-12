import {Link, Outlet} from 'react-router-dom';

import NavHeader from './components/NavHeader';
import NavSection from './components/NavSection';
import NavFooter from './components/NavFooter';
import PhonePageHeader from './components/PhonePageHeader';//Only for phone devices, contains a burger button for nav menu
import { useState } from 'react';

function Layout({triggerPopUpMessage}){
    //Specifies that user sees daily/weekly/monthly tasks
    const [viewMode, setViewMode] = useState("day");

    const [navVisibility, setNavVisibility] = useState('hidden');
    const [mainVisibility, setMainVisibility] = useState('');
    //Set nav hidden or not (change navVisibility state)
    //Also hide or expose the main based on nav hidding state
    //showNav: boolean parameter
    const handleChangeNavVisibility = (showNav)=>{
        showNav?setNavVisibility(''):setNavVisibility('hidden');
        showNav?setMainVisibility('hidden'):setMainVisibility('');
    }

    const handleChangeViewMode = (viewMode)=>{
        setViewMode(viewMode);
        //To hide nav automaticly
        handleChangeNavVisibility(false);
    }
    return(
        <>
        <nav className={`${navVisibility} md:flex`}>
            <NavHeader handleChangeNavVisibility={handleChangeNavVisibility} iconPath={"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6"}/>
            <NavSection onClickSection={()=>handleChangeViewMode("day")} sectionName={"Today Tasks"} iconPath={"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"}/>
            <NavSection onClickSection={()=>handleChangeViewMode("week")} sectionName={"Weekly Tasks"} iconPath={"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"}/>
            <NavSection onClickSection={()=>handleChangeViewMode("month")} sectionName={"Monthly Tasks"} iconPath={"M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"}/>
            <NavSection onClickSection={()=>handleChangeViewMode("month")} sectionName={"All Tasks"} iconPath={"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"}/>
            <NavSection sectionName={"Categories"} iconPath={"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"}/>
            <NavSection sectionName={"Priorities"} iconPath={"M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"}/>
            <Link to={"statistics"}>
                <NavSection sectionName={"Statistics"} iconPath={"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"}/>
            </Link>
            <br/>
            <Link to={"userSettings"}>
                <NavSection onClickSection={()=>handleChangeNavVisibility(false)} sectionName={"Settings"} iconPath={"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"}/>
            </Link>
            <NavFooter userName={"Dummy User"}/>
        </nav>
        <main className={mainVisibility}>
            <PhonePageHeader handleChangeNavVisibility={handleChangeNavVisibility} iconPath={"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6"} />
            <Outlet context={{viewMode,handleChangeViewMode,triggerPopUpMessage}}/>
        </main>
        </>
    );
}

export default Layout;
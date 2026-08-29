import {Outlet} from 'react-router-dom';

import NavHeader from './components/NavHeader';
import NavSection from './components/NavSection';
import NavFooter from './components/NavFooter';
import PhonePageHeader from './components/PhonePageHeader';//Only for phone devices, contains a burger button for nav menu
import { useState } from 'react';

function Layout(){
    const [navVisibility, setNavVisibility] = useState('hidden');
    const [mainVisibility, setMainVisibility] = useState('');
    //Set nav hidden or not (change navVisibility state)
    //Also hide or expose the main based on nav hidding state
    //showNav: boolean parameter
    const handleChangeNavVisibility = (showNav)=>{
        showNav?setNavVisibility(''):setNavVisibility('hidden');
        showNav?setMainVisibility('hidden'):setMainVisibility('');
    }
    return(
        <>
        <nav className={`${navVisibility} md:flex`}>
            <NavHeader handleChangeNavVisibility={handleChangeNavVisibility} iconPath={"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6"}/>
            <NavSection sectionName={"Today"} iconPath={"M3 10.5L12 3l9 7.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10.5z M10 21v-4a2 2 0 0 1 4 0v4"}/>
            <NavSection sectionName={"Tomorrow"} iconPath={"M6 5h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z M3 10h18 M8 3v4 M16 3v4 M7.5 14h.01"}/>
            <NavSection sectionName={"All Tasks"} iconPath={"M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M8 12.5l3 3 5-6"}/>
            <NavSection sectionName={"Categories"} iconPath={"M12.5 2.5a2 2 0 0 0-1.42.58l-8.5 8.5a2 2 0 0 0 0 2.83l6.5 6.5a2 2 0 0 0 2.83 0l8.5-8.5a2 2 0 0 0 .58-1.42V5a2 2 0 0 0-2-2h-6.49z M16.5 7.5h.01"}/>
            <br/>
            <hr/>
            <br/>
            <NavSection sectionName={"Settings"} iconPath={"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}/>
            <NavFooter userName={"Dummy User"}/>
        </nav>
        <main className={mainVisibility}>
            <PhonePageHeader handleChangeNavVisibility={handleChangeNavVisibility} iconPath={"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M9 12l2 2 4-4 M9 18h6"} />
            <Outlet/>
        </main>
        </>
    );
}

export default Layout;
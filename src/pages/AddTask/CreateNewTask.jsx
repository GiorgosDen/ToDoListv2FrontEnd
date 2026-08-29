import AddTaskHeader from "./components/AddTaskHeader";
import AddTaskForm from "./components/AddTaskForm";

import NavHeader from "../../components/NavHeader";
import NavSection from "../../components/NavSection";

function CreateNewTask(){
    return(
        <div>
           <AddTaskHeader/>
           <AddTaskForm/>
        </div>
    );
}

export default CreateNewTask;
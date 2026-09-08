import AddTaskHeader from "./components/AddTaskHeader";
import AddTaskForm from "./components/AddTaskForm";


function CreateNewTask(){
    return(
        <div>
           <AddTaskHeader/>
           <AddTaskForm/>
        </div>
    );
}

export default CreateNewTask;
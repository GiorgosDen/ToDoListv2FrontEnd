import AddTaskHeader from "./components/AddTaskHeader";
import AddTaskForm from "./components/AddTaskForm";


function CreateNewTask(){
    return(
        <div>
           <AddTaskHeader/>
           <AddTaskForm action={"create"} aTask={[]} navigatePath={`/home`}/>
        </div>
    );
}

export default CreateNewTask;
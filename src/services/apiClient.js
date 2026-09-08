//Sets API's url 
import axios from "axios";

//Used to in interceptors response
const datetimeFormatter = new Intl.DateTimeFormat('en-GB',{
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:false
})

const apiClient =  axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
    'Content-Type': 'application/json',
    },
    withCredentials: true
});

//exact UTC time from the string without converting it to your local timezone
apiClient.interceptors.response.use((response)=>{
    const resTasks = response.data.userTasks || response.data.userTask;
    if(response.data && resTasks ){
        const tasks = resTasks;
        //console.log(tasks);
        const taskWithCorrectTimeZone = tasks.map((aTask)=>{
            if(aTask.DateTime){
                const aDate = new Date(aTask.DateTime * 1000);
                aTask.DateTime = datetimeFormatter.format(aDate);
            }
            return aTask;
        })
        response.data.userTasks = taskWithCorrectTimeZone;
    }
    return response;
});

export default apiClient;
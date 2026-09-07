//Sets API's url 
import axios from "axios";

//Used to in interceptors response
const datetimeFormatter = new Intl.DateTimeFormat('en-GB',{
    timeZone:'UTC',
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
    if(response.data && response.data.userTasks){
        const tasks = response.data.userTasks;
        //console.log(tasks);
        const taskWithCorrectTimeZone = tasks.map((aTask)=>{
            aTask.DateTime = datetimeFormatter.format(new Date(aTask.DateTime));
            return aTask;
        })
        response.data.userTasks = taskWithCorrectTimeZone;
    }
    return response;
});

export default apiClient;
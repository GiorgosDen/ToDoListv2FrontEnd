//A list with ErrorMessagePopUp component objects

const PopUpMessagesList =[
    {
        status:200,
        title:"Success",
        description:"",
        iconPath:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
        iconColor:"text-green-500",
        buttonMessage:"Continue"
    },
    {
        status:201,
        title:"Success",
        description:"",
        iconPath:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
        iconColor:"text-green-500",
        buttonMessage:"Continue"
    },
    {
        status:403,
        title:"Session Expired",
        description:"Your login session has expired for security reasons. Please sign in again to continue.",
        iconPath:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
        iconColor:"text-blue-500",
        buttonMessage:"Go to Login"
    },
    {
        status:500,
        title:"Server Error",
        description:"Something went wrong on our end. Please try again.",
        iconPath:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
        iconColor:"text-red-500",
        buttonMessage:"Close"
    },
    {
        status:404,
        title:"Not found",
        description:"Source can't found. Please try different parameters.",
        iconPath:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        iconColor:"text-blue-500",
        buttonMessage:"Close"
    },
    {
        status:401,
        title:"User doesn't exists",
        description:"Try again with different email or password.",
        iconPath:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        iconColor:"text-red-500",
        buttonMessage:"Close"
    },
    {
        status:409,
        title:"Data conflict",
        description:"These data already used. Try different data.",
        iconPath:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
        iconColor:"text-amber-500",
        buttonMessage:"Close"
    },
    {
        status:'default',
        title:"Unpredictable Error",
        description:"Sory about that. Error with no suitable message.",
        iconPath:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
        iconColor:"text-gray-500",
        buttonMessage:"Close"
    },
    {
        status:'create-new-task-category',
        title:"Create a New Task Category",
        description:"Create new task category successful.",
        iconPath:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
        iconColor:"text-blue-500",
        buttonMessage:"Close"
    },
    {
        status:'update-task-category',
        title:"Update Task Category",
        description:"Update the Task Category Successful.",
        iconPath:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
        iconColor:"text-blue-500",
        buttonMessage:"Close"
    },
    {
        status:'task-category-delete',
        title:"Delete Task Category",
        description:"Delete the Task Category successful.",
        iconPath:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
        iconColor:"text-green-500",
        buttonMessage:"Close"
    },
    {
        status:'delete-completed',
        title:"Cannot Delete Completed Tasks",
        description:"Completed tasks can't be deleted.",
        iconPath:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.42.38-2.73 1.04-3.87l10.83 10.83C14.73 19.62 13.42 20 12 20zm7.96-4.13L9.13 5.04C10.27 4.38 11.58 4 13 4c4.41 0 8 3.59 8 8 0 1.42-.38 2.73-1.04 3.87z",
        iconColor:"text-yellow-500",
        buttonMessage:"Close"
    },
    {
        status:'empty-update-user',
        title:"Empty Fields",
        description:"You're trying to update your data without filling out the form. You must fill out at least one field.",
        iconPath:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
        iconColor:"text-amber-500",
        buttonMessage:"Close"
    }
]

export default PopUpMessagesList;
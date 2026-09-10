//A list with ErrorMessagePopUp component objects

const PopUpErrorsList =[
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
        status:'delete-completed',
        title:"Cannot Delete Completed Tasks",
        description:"Completed tasks can't be deleted.",
        iconPath:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.42.38-2.73 1.04-3.87l10.83 10.83C14.73 19.62 13.42 20 12 20zm7.96-4.13L9.13 5.04C10.27 4.38 11.58 4 13 4c4.41 0 8 3.59 8 8 0 1.42-.38 2.73-1.04 3.87z",
        iconColor:"text-yellow-500",
        buttonMessage:"Close"
    }
]

export default PopUpErrorsList;
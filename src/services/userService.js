import apiClient from "./apiClient";

const userService ={
    async updateUserData(userData,count){
        //1->change fullname
        //2->change email
        //4->change password
        //3-> change fullname & email
        //5->change fullname & password
        //6-> change email & password
        //7->change all
        try {
            //const response = await apiClient.put("/user",userData);
            const {fullName,email,password,curPassword,curFullName,curEmail} = userData;
            let response = {};
            console.log("UserService receives the counter:",count);
            switch (count){
                case 1:
                    response = await apiClient.patch('/user/fullname',{fullName:fullName});
                    break;
                case 2:
                    response = await apiClient.post('/user/update-email',{
                        fullName:curFullName,
                        oldEmail:curEmail,
                        newEmail:email
                    });
                    break;
                case 4:
                    response = await apiClient.patch('/user/password',{
                        password:password,
                        curPassword:curPassword
                    });
                    break;
                case 3:
                    const [nameRes3,emailRes3] = await Promise.all([
                        apiClient.patch('/user/fullname',{fullName:fullName}),
                        apiClient.post('/user/update-email',{
                            fullName:curFullName,
                            oldEmail:curEmail,
                            newEmail:email
                        })
                    ]);
                    response = {nameRes3,emailRes3};
                    break;
                case 5:
                    const [nameRes5, passRes5] = await Promise.all([
                        apiClient.patch('/user/fullname',{fullName:fullName}),
                        apiClient.patch('/user/password',{
                            password:password,
                            curPassword:curPassword
                        })
                    ])
                    response = {nameRes5,passRes5};
                    break;
                case 6:
                    const [emailRes6,passRes6] = await Promise.all([
                        apiClient.post('/user/update-email',{
                            fullName:curFullName,
                            oldEmail:curEmail,
                            newEmail:email
                        }),
                        apiClient.patch('/user/password',{
                            password:password,
                            curPassword:curPassword
                        })
                    ]);
                    response = {emailRes6,passRes6};
                    break;
                case 7:
                    const [fullnameRes, passwordRes, emailRes] = await Promise.all([
                        apiClient.patch('/user/fullname',{fullName:fullName}),
                        apiClient.patch('/user/password',{
                            password:password,
                            curPassword:curPassword
                        }),
                        apiClient.post('/user/update-email',{
                            fullName:curFullName,
                            oldEmail:curEmail,
                            newEmail:email
                        })
                    ])
                    response = {fullnameRes,passwordRes,emailRes};
                    break;
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserData(){
        try {
            const response = await apiClient.get("/user");
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deactivateUserAccount(userData){
        try {
            const deactivateUser = await apiClient.post("/user/deactivate-email",userData);
            const logOutRes = await apiClient.post('/auth/logout');
            if(deactivateUser && logOutRes){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default userService;
import { userAxiosInstant } from "../AxiosUtils/AxiosUtils";


  const RefreshToken = async () => {
    let authToken = localStorage.getItem("token");
    const refreshtoken = JSON.parse(authToken);
    const res = await userAxiosInstant.post(
      "accounts/token/refresh/",
      { refresh: refreshtoken.refresh },
      { withCredentials: true }
    );
    if (res.status === 200) {
      const token = JSON.stringify(res.data);
      localStorage.setItem("token", token);
    }
  };

 

  const UserLogin = (values) => {
    return userAxiosInstant.post("accounts/token/", values, {
      withCredentials: true,
    }).catch((error) => error.response);
  };




  const Logout = () => {
    const authToken = localStorage.getItem("token");
    const refreshToken = JSON.parse(authToken).refresh;
  
    return userAxiosInstant
      .post('accounts/logout/', { refresh: refreshToken }, { withCredentials: true })
      .then((response) => {
        console.log("Logout successful", response);
        localStorage.removeItem("token");
        return response; // Return the response to indicate success
      })
      .catch((error) => {
        console.error("Error during logout: ", error.response);
        throw error; // Propagate the error to the caller
      });
  };


  const GetProfileDetails = (id) => {
    return userAxiosInstant
      .get(`accounts/profile/${id}/`, {
        withCredentials: true,
      })
      .catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
  };
  

  const EditProfileDetails = (id, values) =>{
    return userAxiosInstant
      .put(`accounts/profile/${id}/`, values, {
        withCredentials: true,
      })
      .catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          console.log(error);
          error.response;
        }
      });
  }

  const ChangeUserPassword = ( values) =>{
    return userAxiosInstant
      .put(`accounts/changepassword/`, values, {
        withCredentials: true,
      })
      .catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          console.log(error);
          error.response;
        }
      });
  }



  export { Logout,UserLogin,GetProfileDetails,EditProfileDetails,ChangeUserPassword};
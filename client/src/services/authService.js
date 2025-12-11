export const isAuthenticated = () => {
  return sessionStorage.getItem("authenticated") === "true";
};

export const signOut = async () => {
  //clear the session storage flag
  sessionStorage.removeItem("authenticated");

  //remove the httpOnly jwt cookie
  const fetchOptions = {
    method: "POST",
    credentials: "include",
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/logout`,
    fetchOptions
  );
};



export const currentAuthenticatedUser = ()=> {
    return sessionStorage.getItem('user');
}
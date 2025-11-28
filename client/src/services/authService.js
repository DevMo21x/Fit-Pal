export const isAuthenticated = () => {
  return sessionStorage.getItem("authenticated") === "true";
};

export const signOut = async () => {
  //clear the session storage flag
  sessionStorage.removeItem("authenticated");

  //remove the httpOnly jwt cookie
  fetchOptions = {
    method: "POST",
    credentials: "include",
  };
  const response = await fetch(
    "http://localhost:3000/api/users/logout",
    fetchOptions
  );
};

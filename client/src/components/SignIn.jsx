import "../css/signin.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currentAuthenticatedUser } from "../services/authService";
const SignIn = (props) => {
  // getting the functions and objects form the useForm object for validation and mutation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Send the data to the login endpoint
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // create our mutation to communicate to the API
  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Login not successful");
      return await res.json();
    },
    onSuccess: (responseBody) => {
      const userEmail = responseBody.email;

      // Set variable in the session storage
      sessionStorage.setItem("authenticated", true);
      sessionStorage.setItem("user", userEmail);
      // sessionStorage.setItem('user', response.body.email);
      // redirect to the home page/route
      navigate("/");
    },
    onError: (err) => {
      console.error("login Error", err.message);
    },
  });

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        autoFocus
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email must be valid",
          },
        })}
      />

      {/* Displaying an error message for the email input */}
      {errors.email && (
        <p className="text text-danger"> {errors.email.message}</p>
      )}
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      {mutation.isError && (
        <p className="text-danger">Invalid login. Try again.</p>
      )}
    </form>
  );
};

export default SignIn;

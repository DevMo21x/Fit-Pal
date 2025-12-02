import "../css/signin.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const SignIn = (props) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Send the data to the login endpoint
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // create our mutation to communicate to the API
  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const res = await fetch("http://localhost:3000/api/users/login", {
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
      console.log("Login Success!", responseBody);

      // cookie has been set...token is available
      sessionStorage.setItem('authenticated', true);
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
        {...register("email", { required: true })}
      />
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

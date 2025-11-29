import "../css/signin.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Register = (props) => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Send the data to the login endpoint
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  //create our mutation to communicate to the API
  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const res = await fetch("http://localhost:3000/api/users/register", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Register unsuccessful");
      return await res.json();
    },
    onSuccess: (responseBody) => {
      console.log("Registered!", responseBody);

      // cookie has been set...token is available

      // redirect to the home page/route
      navigate("/");
    },
    onError: (err) => {
      console.error("Unable to register!", err.message);
    },
  });
  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>
      <label htmlFor="inputFirstName" className="sr-only">
        First Name:
      </label>
      <input
        type="text"
        id="inputFirstName"
        className="form-control"
        placeholder="John"
        autoFocus
        {...register("firstName", { required: true })}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Last Name:
      </label>
      <input
        type="text"
        id="inputLastName"
        className="form-control"
        placeholder="Doe"
        {...register("lastName", { required: true })}
      />

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
        Register
      </button>
      {
        mutation.error && (
          <p className="text-danger">Invalid info, try again.</p>
        )
      }
    </form>
  );
};

export default Register;

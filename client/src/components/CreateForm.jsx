import "../css/signin.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Create = (props) => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Send the data to the login endpoint
  const onSubmit = ({ firstName, lastName }) => {
    const newRecord = {
      user: {
        firstName,
        lastName
      },
    };

    mutation.mutate(newRecord);
  };

  //create our mutation to communicate to the API
  const mutation = useMutation({
    mutationFn: async (newRecordData) => {
      const res = await fetch("http://localhost:3000/api/workouts/", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newRecordData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to create a new record!");
      return await res.json();
    },
    onSuccess: (responseBody) => {
      console.log("Created!", responseBody);

      // cookie has been set...token is available

      // redirect to the home page/route
      navigate("/");
    },
    onError: (err) => {
      console.error("Unable to create!", err.message);
    },
  });
  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Create a new record{" "}
      </h1>
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

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Create
      </button>
      {mutation.error && (
        <p className="text-danger">Invalid info, try again.</p>
      )}
    </form>
  );
};

export default Create;

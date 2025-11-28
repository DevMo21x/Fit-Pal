import '../css/signin.css';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { json } from 'express';
const SignIn = (props) => {
    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();
    // Send the data to the login endpoint
    const onSubmit = (data) => {
        console.log(data);
    };

    // create our mutation to communicate to the API
    const mutation = useMutation(function (loginData) {
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: { 'content-type': 'application/json' },
        })
            .then((res) => res.json)
            .then((json) => console.log(json));
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
                {...register('email', { required: true })}
            />
            <label htmlFor="inputPassword" className="sr-only">
                Password
            </label>
            <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                {...register('password', { required: true })}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
            </button>
        </form>
    );
};

export default SignIn;

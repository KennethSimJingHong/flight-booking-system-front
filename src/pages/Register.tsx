import React, { FormEvent, useRef, useState } from 'react';
import authService from '../services/auth-service';
import User from '../models/user';
import { registerSchema } from '../validations/RegisterValidation';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);

    const registerHandler = (event: FormEvent) => {
        event.preventDefault();
        
        let formData = {
            username: username.current?.value, 
            password: password.current?.value,
            name: name.current?.value,
            phone: phone.current?.value,
            email: email.current?.value
        }

        registerSchema.validate(formData).then(() => {
            const newUser = new User(0,
            username.current?.value!,
            email.current?.value!,
            name.current?.value!,
            phone.current?.value!,
            null!);
            authService.register(newUser,password.current?.value!)
            .catch(error => {
                if((error.response && error.response.data && error.response.data.message) || error.message || error.toString()){
                    setErrorMessage(error.message);
                }
                
            });
            clearForm(); 
        }).catch(err => 
            setErrorMessage(err.errors)
        );

        
    }

    const clearForm = () => {
        username.current!.value = '';
        email.current!.value = '';
        name.current!.value = '';
        phone.current!.value = '';
        password.current!.value = '';
    }

    return (
        <div>
            {errorMessage &&
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            }
            <form className="col-lg-6 offset-lg-3 mt-5 border border-danger shadow p-3 mb-5 bg-body rounded">
                <div className="container-fluid">
                    <h2 className="my-4 text-danger">Register</h2>
                    <hr/>
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                        <input type="text" className="form-control" id="usernameInput" ref={username} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordInput" ref={password} />
                    </div>
                    <hr className="mt-5"/>
                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="nameInput" className="form-label">Name</label>
                            <input type="text" className="form-control" id="nameInput" ref={name} />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="phoneInput" className="form-label">Phone No.</label>
                            <input type="text" className="form-control" id="phoneInput" ref={phone} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="emailInput" ref={email} />
                    </div>
                    <button type="button" className="btn btn-danger mt-3" onClick={registerHandler}>Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
import React, {FormEvent, useState} from 'react';
import authService from '../services/auth-service';
import {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {loginSchema} from "../validations/LoginValidation";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();

    const submitandler = (event: FormEvent) => {
        event.preventDefault();

        let formData = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        }
        
        loginSchema.validate(formData)
        .then(() => 
            authService.login(usernameRef.current?.value!, passwordRef.current?.value!).then(
            () => {
                navigate("/");
                window.location.reload();
            },
            error => {
                if((error.response && error.response.data && error.response.data.message) || error.message || error.toString()){
                    setErrorMessage("Wrong login credential");
                }
                
            }
        ))
        .catch( err => {
            setErrorMessage(err.errors[0]);
        })
            
        
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
                    <h2 className="my-4 text-danger">Login</h2>
                    <hr/>
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                        <input type="text" ref={usernameRef} className="form-control" id="usernameInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" ref={passwordRef} className="form-control" id="passwordInput" />
                    </div>
                    <button type="button" onClick={submitandler} className="btn btn-danger">Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
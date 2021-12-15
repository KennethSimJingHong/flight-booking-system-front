import React, { useEffect, useState, Fragment } from 'react';
import authService from '../../services/auth-service';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/user-slice";
import { RootState } from '../../store';
import User from '../../models/user';



const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const showManagement = useSelector((state:RootState) => state.user.showManagement);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if(user != null){
            const newUser = new User(user.id, user.username, user.email, user.name, user.phone, user.roles);
            dispatch(userActions.setCurrentUser(newUser));
            dispatch(userActions.setShowManagement(newUser.roles.includes("ROLE_ADMIN")));
        }
    },[]);

    const logoutHandler = () => {
        authService.logout();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-danger">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Flyify</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {currentUser.name ?
                    <Fragment>
                    {showManagement ? 
                    <li className="nav-item"><NavLink className="nav-link" to="/management">Management</NavLink></li>
                    :   <li className="nav-item"><NavLink className="nav-link" to="/booking">Booking</NavLink></li>}
                    <li className="nav-item"><NavLink className="nav-link d-flex" to="/history">History</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/" onClick={logoutHandler}>Logout</NavLink></li>
                    </Fragment>
                    :
                     <Fragment>
                         <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                         <li className="nav-item"><NavLink className="nav-link" to="/register">Sign Up</NavLink></li>
                     </Fragment>
                    }
                </ul>
                </div>
            </div>
        </nav>

       
    );
};

export default Header;
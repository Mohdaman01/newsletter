import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode";
import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HomeNewsContext } from "../context/NewsProvider";

const loginContainer = {
    "position": "absolute",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "background-color": "grey",
    "top": "25%",
    "left": "25%",
    "width": "50%",
    "height": "50%",
    "border-radius": "10px"
}

const loginStyle = {
    // "margin" : "0 auto"
}

const Login = (props) => {

    const { setAccount } = useContext(AccountContext);
    const { setHomeNews,setPageno } = useContext(HomeNewsContext);
    const navigation = useNavigate();

    const successHandler = async (res) => {
        try {

            const decoded = jwtDecode(res.credential);
            const newAccount = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture
            }
            setAccount(newAccount);

            localStorage.setItem("loginTokken", res.credential);

            if (localStorage.getItem('loginTokken') === null) {
                // https://newsfixserver.onrender.com/
                await axios.post(`$${process.env.REACT_APP_Host}create-account`, {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                    loginTokken: res.credential
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

            }
            
            setHomeNews([]);
            setPageno(1);
            navigation('/');

            return;

        } catch (err) {

            console.log(err);
            return;

        }

    }

    const errorHandler = (err) => {
        console.log(err);
    }


    return (
        <>

            <h1 style={{ "text-align": "center", "margin": "2rem 0" }} >Sign in with Google</h1>
            <div style={loginContainer} >

                <GoogleLogin onSuccess={successHandler} onError={errorHandler} style={loginStyle} />

            </div>
        </>
    )
}

export default Login;
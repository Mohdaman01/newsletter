import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode";
import { AccountContext } from "../context/AccountProvider";
import { useContext } from "react";
import axios from "axios";

const loginContainer = {
    "position": "absolute",
    "display" : "flex",
    "justify-content" : "center",
    "align-items" : "center",
    "background-color": "grey",
    "top" : "25%",
    "left": "25%",
    "width": "50%",
    "height": "50%",
    "border-radius": "10px"
}

const loginStyle = {
    // "margin" : "0 auto"
}

const Login = () => {

    const { setAccount } = useContext(AccountContext);

    const successHandler = async (res) => {
        try {

            const decoded = jwtDecode(res.credential);
            // console.log(decoded);
            localStorage.setItem("loginTokken", res.credential);
            setAccount(decoded);

            await axios.post('http://localhost:5000/create-account',{
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
                loginTokken : res.credential
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // console.log(resposnce);

            return ;

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
            
            <h1 style={{"text-align": "center", "margin": "2rem 0"}} >Sign in with Google</h1>
            <div style={loginContainer} >

                <GoogleLogin onSuccess={successHandler} onError={errorHandler} style={loginStyle} />

            </div>
        </>
    )
}

export default Login;
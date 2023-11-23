import { useContext, useEffect } from "react";
import Home from "./components/home";
import jwtDecode from "jwt-decode";
import { AccountContext } from "./context/AccountProvider";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";


function App() {

  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {

    (async () => {

      try {

        const accountArray = Object.keys(account);

        if (localStorage.getItem('loginTokken') !== null && accountArray.length === 0) {
          
          const decoded = jwtDecode(localStorage.getItem('loginTokken'));

          const newAccount = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
          }

          setAccount(newAccount);

        }

      } catch (err) {

        console.log(err);

      }

    })();


  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

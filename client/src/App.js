import { useContext, useEffect } from "react";
import Home from "./components/home";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { AccountContext } from "./context/AccountProvider";
 

function App() {

  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {

    // const abortController = new AbortController;

    (async () => {

      try {

        const accountArray = Object.keys(account);

        if (localStorage.getItem('loginTokken') !== null && accountArray.length === 0) {
          console.log(localStorage.getItem('loginTokken'))
          const decoded = jwtDecode(localStorage.getItem('loginTokken'));
           
          const newAccount = {
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture
          }

          setAccount(newAccount);
          // (async () => {

          //     const response = await axios.post('https://newsfixserver.onrender.com/get-user',{
          //         loginTokken: localStorage.getItem('loginTokken')
          //     }, {
          //         signal: abortController.signal,
          //         headers: {
          //             'Content-Type': 'application/x-www-form-urlencoded'
          //         }
          //     });
          //     setAccount(response.data.account);

          // })();
      }

      } catch (err) {

        // if(err.name !== "CanceledError"){
            
        //   console.log("fetch failed"); 
        
        // }
        console.log(err);

      }

    })();

    // return ()=> abortController.abort();

  }, [])


  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

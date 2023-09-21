import { useContext, useEffect } from "react";
import Home from "./components/home";
import axios from "axios";
import { AccountContext } from "./context/AccountProvider";
 

function App() {

  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {

    (async () => {

      try {


        if (localStorage.getItem('loginTokken') !== null && account === null) {

          (async () => {

              const response = await axios.post('http://localhost:5000/get-user', {
                  loginTokken: localStorage.getItem('loginTokken')
              }, {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              });
              setAccount(response.data.account);

          })();

      }

      } catch (err) {

        console.log("Sever is down");

        return;

      }

    })()

  }, [])


  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

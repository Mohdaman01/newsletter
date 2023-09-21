import { createContext, useState } from "react";

export const HomeNewsContext = createContext(null);

const NewsProvider = ({children}) =>{

    const [homeNews, setHomeNews] = useState([]);

    return (
        <HomeNewsContext.Provider 

            value={{
                homeNews,
                setHomeNews
            }}

        >
            {children}
        </HomeNewsContext.Provider>
    )

}

export default NewsProvider;
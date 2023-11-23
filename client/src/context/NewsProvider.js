import axios from "axios";
import { createContext, useState } from "react";

export const HomeNewsContext = createContext(null);

const NewsProvider = ({ children }) => {

    const [homeNews, setHomeNews] = useState([]);
    const [searchNews, setSearchNews] = useState([]);
    const [fetch, setFetch] = useState(true);
    const [pageno, setPageno] = useState(1);

    const fetchData = async () => {
        try {
             
            const News = await axios.get(process.env.REACT_APP_Host, {
                params: {
                    page: pageno,
                    country: localStorage.getItem('loginTokken') !== null ? localStorage.getItem('CountryFilter') : "",
                    category: localStorage.getItem('loginTokken') !== null ? localStorage.getItem('CategoryFilter') : ""
                }
            });

            setHomeNews(preState => [...preState, ...News.data.data.articles]);
            setPageno(prevState => prevState + 1)
            return;

        } catch (err) {
            console.log("Sever is down");
            setFetch(false);
            return;
        }

    }

    const searchNewsData = async (tosearch) => {
        try {
             
            const News = await axios.get(`${process.env.REACT_APP_Host}search`, {
                params: {
                    query: tosearch
                }
            });

            setSearchNews(News.data.data.articles);
            return;

        } catch (err) {
            console.log(err);
            return;
        }
    }

    return (
        <HomeNewsContext.Provider

            value={{
                homeNews,
                setHomeNews,
                pageno,
                setPageno,
                fetch,
                setFetch,
                fetchData,
                searchNews,
                setSearchNews,
                searchNewsData
            }}

        >
            {children}
        </HomeNewsContext.Provider>
    )

}

export default NewsProvider;
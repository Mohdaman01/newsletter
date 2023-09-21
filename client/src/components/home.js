import NewsCard from "./newsCard";
import { useContext, useEffect, useState } from "react";
import { HomeNewsContext } from "../context/NewsProvider";
import Navbar from "./Navbar";
import { nanoid } from "nanoid";
import Login from "./Login";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";



const homeStyle = {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "padding-top": "4.2rem",
}

const Home = () => {

    const { homeNews, setHomeNews } = useContext(HomeNewsContext);

    const [pageno, setPageno] = useState(1);

    const [fetch, setFetch] = useState(true);

    const [searchNews, setSearchNews] = useState([]);


    useEffect(() => {

        fetchData();

    }, [])

    const fetchData = async () => {

        try {

            const News = await axios.get(`http://localhost:5000/`, {
                params: {
                    page: pageno
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


    return (
        <div>
            { 
            localStorage.getItem('loginTokken') !== null ?

                    <div>
                        <Navbar searchNews={searchNews} setSearchNews={setSearchNews} />
                        <div >
                            <InfiniteScroll
                                style={homeStyle}
                                dataLength={homeNews.length}
                                next={fetchData}
                                hasMore={fetch} // Replace with a condition based on your data source
                                loader={<p>Loading...</p>}
                                endMessage={<p>No more data to load.</p>}
                                scrollableTarget='scrollableDiv'
                            >
                                {searchNews.length !== 0 && 
                                    searchNews.map((news)=>(
                                        <NewsCard news={news} key={nanoid()} />
                                    ))
                                }

                                {
                                    homeNews.length !== 0
                                        ?
                                        homeNews.map((news) => (

                                            <NewsCard news={news} key={nanoid()} />

                                        ))
                                        :
                                        <h3>
                                            Server is down please wait!
                                        </h3>
                                }

                            </InfiniteScroll>
                        </div>
                    </div>

                    :

                    <Login />
            }


        </div>
    )
}

export default Home;


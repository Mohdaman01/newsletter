import NewsCard from "./newsCard";
import { useContext, useEffect, useState } from "react";
import { HomeNewsContext } from "../context/NewsProvider";
import Navbar from "./Navbar";
import { nanoid } from "nanoid";
import InfiniteScroll from "react-infinite-scroll-component";
import NewNewsCard from "./NewNewsCard";



const homeStyle = {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "padding-top": "4.2rem",
}


const Home = () => {

    const { homeNews, fetch,fetchData, searchNews } = useContext(HomeNewsContext);




    useEffect(() => {

        // fetchData(); 

    }, [])


    return (

        <div>
            <Navbar fetchData={fetchData} />
            <div >
                <InfiniteScroll
                    style={homeStyle}
                    dataLength={homeNews.length}
                    next={fetchData}
                    hasMore={localStorage.getItem('loginTokken') !==null? fetch: false} 
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more News to load.</p>}
                    scrollableTarget='scrollableDiv'
                >
                    {searchNews.length !== 0 &&
                        searchNews.map((news) => (
                            <NewNewsCard news={news} key={nanoid()} />
                        ))
                    }

                    {
                        homeNews.length !== 0
                            ?
                            homeNews.map((news) => (

                                <NewNewsCard news={news} key={nanoid()} />

                            ))
                            :
                            <h3 style={{ paddingTop: '4rem' }}>
                                Fetching Latest HeadLines!!
                            </h3>
                    }

                </InfiniteScroll>
            </div>
        </div>

    )
}

export default Home;


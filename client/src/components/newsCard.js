
const cardstyle = {
    "display" : "flex",
    "margin": "1.2rem 3rem",
    "padding" : "1rem",
    "width": "90%",
    "max-width" : "1000px",
    "background-color": "lightgrey",
    "border-radius": "10px"
}

const imgContainer = {
    "width" : "40rem",
    "overflow": "hidden"
}

const imgStyle = {
    "width": "100%",
    "height" : "100%",
    "border-radius": "10px"
}

const rightSideStyle = {
    "margin" : "0 1rem"
}

const NewsCard = (props) => {

    const news = props.news;
    // console.log(news);
    return(
        <div style={cardstyle}>
            <div style={imgContainer}><img style={imgStyle} src={news.urlToImage} alt="img" /></div>
            <div style={rightSideStyle} >
                <h3>{news.title}</h3>
                <p>{news.content}</p>
            </div>
            
        </div>
    )
}

export default NewsCard;
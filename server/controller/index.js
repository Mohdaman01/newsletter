const NewsApi = require('newsapi');
const newsapi = new NewsApi(process.env.NEWS_API_KEY);

module.exports.home = async(req,res) =>{

    const pageno = req.query.page; 
    const country = req.query.country;
    const category = req.query.category;
    console.log('fired');
    console.log(country);
    console.log(category); 
    try{ 
        
        const data  = await newsapi.v2.topHeadlines({ 
            country: country || "",
            category: category || "",
            language: country === "" ? "en" : "",
            page: pageno || 1
            
        });
   
        return res.status(200).json({ 
            message: 'here is the data',   
            data
        })
 

    }catch(err){
         console.log(err); 
         return res.status(500).json({
            message: 'Internal Server Error'
         })
    } 

}

module.exports.search = async (req,res) =>{

    const query = req.query.query;
    
    try{

        const data = await newsapi.v2.everything({
            domain:query,
            q: query,
            language: 'en'
        });

        return res.status(200).json({
            message: 'here is searched News!',
            data
        })

    }catch(err){

        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }

}
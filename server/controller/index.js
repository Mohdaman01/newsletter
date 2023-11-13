const NewsApi = require('newsapi');
const newsapi = new NewsApi(process.env.newsAPIkey);

module.exports.home = async(req,res) =>{

    const pageno = req.query.page; 
 
    try{ 
        
        const data  = await newsapi.v2.topHeadlines({ 
            language: 'en',
            page: pageno
            
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
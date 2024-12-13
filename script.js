
const apikey = 'c7e26d113d654766a567c8d9513de99d';
const blogContainer = document.getElementById("Blog-Container");

const searchField=document.getElementById('search')
const searchButton=document.getElementById('button')

async function fetchRandomNews() {
    try{
const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize10&apikey=${apikey}`
const response=await fetch(apiUrl);
const data = await response.json();
console.log(data);
return data.articles;

    }

    catch(error){
     console.error("Error in fetching the news",error);
     return [];//empty error
    }
}
searchButton.addEventListener("click",async()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
const articles=await fetchNewsQuery(query)
displayBlogs(articles)
        }
        catch(error){
            console.log("Eroor in fetching news by query",error);
            
        }
    }
})



async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=27&apikey=${apikey}`;
        const response=await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
            }
        
            catch(error){
             console.error("Error in fetching the news",error);
             return [];//empty error
            }
}


function displayBlogs(articles) {
    if (!Array.isArray(articles) || articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles found.</p>";
        return;
    }

    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard=document.createElement("div");
        blogCard.classList.add("Blog-Cards");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");

        const truncatedTitle=
        article.title.length> 30
        ? article.title.slice(0,30)+ " ... "
        :article.title;
        title.textContent=truncatedTitle;
        title.textContent=article.title
        const description=document.createElement("p");

        // const truncatedDes=
        // article.description.length> 100
        // ? article.description.slice(0,100)+
        // "..."
        // :article.description;
        // description.textContent=truncatedDes;
        // description.textContent=article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
        
    });
}

(async () => {
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
        console.log(articles);

        
    }
    catch(error){
        console.error("Error fetching random news",error);
    }
})();

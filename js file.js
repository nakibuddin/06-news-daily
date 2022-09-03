document.getElementById('btn-news').addEventListener('click', function(){
    // console.log('Nakib');
})
document.getElementById('btn-blog').addEventListener('click', function(){
    // console.log('Sakib');
})

fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data => loadCategoryData(data));

const loadCategoryData = data =>{
    const categories = data.data.news_category;
    for(const category of categories){
        // console.log(category.category_name);
        const categoryDiv = document.createElement('div');                                
        categoryDiv.innerHTML = `
            <p class="my-cursor"> ${category.category_name} </p>                    
        `;
        document.getElementById('category-container').appendChild(categoryDiv);

    }            
};
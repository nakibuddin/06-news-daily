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
            <p onclick="fetchNews('${category.category_id}')" class="my-cursor"> ${category.category_name} </p>                    
        `;
        document.getElementById('category-container').appendChild(categoryDiv);

    }            
};

const fetchNews = categoryId =>{            
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;            
    fetch(url)
    .then(res => res.json())
    .then(data => showNews(data));
};

const newsTrim = str =>{            
    array1 = str.split("");
    if(array1.length > 550){
        array2 = array1.slice(0,550);
        array2.push('.');
        array2.push('.');
        array2.push('.');
        newString = array2.join("");            
        return newString;                
    }
    else{
        return str;
    }
};
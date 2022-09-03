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
    // console.log(data);
    // const myData = `${data}`    
    // console.log(myData);
    // console.log(typeof myData);
    // document.getElementById('category-container').appendChild(categoryDiv);
    const categories = data.data.news_category;
    for(const category of categories){
        // console.log(category.category_name);
        const categoryDiv = document.createElement('div');      
        categoryDiv.innerHTML = `
            <p onclick="fetchNews('${category.category_id}')" class="my-cursor">
             ${category.category_name} </p>                    
        `;
        document.getElementById('category-container').appendChild(categoryDiv);

    }            
};

const fetchNews = categoryId =>{            
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showNews(data, url));
};

const showNews = (data,url) =>{    
    document.getElementById('news-container').innerText = ``;    
    // const newsTitle = data.data[0] ? data.data[0].title : 'No data found';
    if(data.data.length != 0){ 
        setNewsUI(data,url);
    }
    else{
        document.getElementById('news-container').innerHTML = `<br><br><br><br><br><br>
         <h3 class="text-center"> Data Not Found</h3> `;
    }                        
}; 
    
const setNewsUI = (data,url) =>{    
    const items = data.data;
    let item;
    let i=-1;    
    for(item of items) {
        // const thumbnailImageUrl = data.data[0].image_url;
        // const newsTitle = data.data[0].title;
        // const newsDetails = newsTrim(data.data[0].details);                
        // const authorImageUrl = data.data[0].author.img;                
        // const authorName = data.data[0].author.name;
        // const publishDate = data.data[0].author.published_date;
        // const views = data.data[0].total_view;
        const myData = 123;
        i++;

        const thumbnailImageUrl = item.image_url;
        const newsTitle = item.title;
        const newsDetails = newsTrim(item.details);
        const authorImageUrl = item.author.img;                
        const authorName = item.author.name;
        const publishDate = item.author.published_date;
        const views = item.total_view;
                        

        const newsDiv = document.createElement('div');                                
        newsDiv.innerHTML = `
            <div class="d-flex single-news-block">
                <img class="thumbnail_img rounded" src="${thumbnailImageUrl}">

                <div class="m-4 d-flex flex-column justify-content-between">
                    <div class="">
                        <h5>${newsTitle}</h5> 
                        <p class="text-muted">${newsDetails}</p>
                    </div>
                    
                    <div class="d-flex justify-content-between mt-4">
                        <div class="d-flex">
                            <img class="author-img rounded-circle" src="${authorImageUrl}">
                            <p>${authorName}</p>                    
                        </div>

                        <div class="d-flex">
                            <p class="me-2"> <i class="fa-regular fa-eye"></i> </p>
                            <p>${views}</p>                                            
                        </div>
                        
                        <p id="btn-view-details" onclick="openModal('${url}', ${i})" class="arrow-color my-cursor me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i> </p>
                    </div>
                </div>

            </div>                    
        `;
        document.getElementById('news-container').appendChild(newsDiv);
    }                
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


 
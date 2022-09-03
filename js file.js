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
        const categoryId = category.category_id;
        const categoryName = category.category_name;        

        const categoryDiv = document.createElement('div');      
        categoryDiv.innerHTML = `
            <p onclick="fetchNews('${categoryId}', '${categoryName}')" class="my-cursor">
             ${category.category_name} </p>                    
        `;
        document.getElementById('category-container').appendChild(categoryDiv);

    }            
};

const fetchNews = (categoryId,categoryName) =>{            
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showNews(data, categoryName, url));
};

const showNews = (data, categoryName, url) =>{    
    document.getElementById('news-container').innerText = ``;    
    // const newsTitle = data.data[0] ? data.data[0].title : 'No data found';
    if(data.data.length != 0){ 
        setNewsUI(data, categoryName, url);
    }
    else{
        document.getElementById('news-container').innerHTML = `<br><br><br><br><br><br>
         <h3 class="text-center"> Data Not Found</h3> `;
    }                        
}; 
    
const setNewsUI = (data, categoryName, url) =>{    
    const items = data.data;
    const itemNumber = items.length;
    const itemNumberDiv = document.createElement('div');                                
    itemNumberDiv.innerHTML = `
        <h6 class="bg-light mb-4 py-3 ps-4 rounded"> ${itemNumber} items found for category ${categoryName} </h6>
    `;

    document.getElementById('news-container').appendChild(itemNumberDiv);


    let item;
    let i=-1;    
    for(item of items) {        
        i++;
        const thumbnailImageUrl = item.image_url;
        const newsTitle = item.title;
        const newsDetails = newsTrim(item.details);
        const authorImageUrl = item.author.img;                
        const authorName = item.author.name ? item.author.name: 'Not Available';
        
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


const openModal = (url,i) =>{    
    fetch(url)
    .then(res => res.json())
    .then(data => {                

        const thumbnailImageUrl = data.data[i].image_url;
        const newsTitle = data.data[i].title;
        const newsDetails = data.data[i].details;                
        const authorImageUrl = data.data[i].author.img;                                
        const authorName = data.data[i].author.name ? data.data[i].author.name: 'Not Available';
        const publishDate = data.data[i].author.published_date;
        const views = data.data[i].total_view;

        
        document.querySelector('.modal-body').innerHTML = `
            <h5>${newsTitle}:</h5> 
            <img class="img-fluid rounded" src="${thumbnailImageUrl}">
            <p class="text-muted"> <br>${newsDetails}</p>

            <h5 class="text-center">  Author  </h5>
            <img class="d-block w-25 rounded m-auto" src="${authorImageUrl}">

            <div class="text-center">
                <h6 class="d-inline-block"> <br> Author Name:  </h6>
                <p class="d-inline-block"> ${authorName} </p>
            <div>

            <div class="text-start">
                <h6 class="d-inline-block"> Published Date:  </h6>
                <p class="d-inline-block mb-0"> ${publishDate} </p>
            <div>                        
            
            
            <h6 class="d-inline-block"> Total View:  </h6>
            <p class="d-inline-block"> ${views} </p>
            

        `;
    });      
};

document.getElementById('btn-news').classList.add('btn-color');

document.getElementById('btn-news').addEventListener('click', function(){
    document.getElementById('blog-container').classList.add('d-none');
    document.getElementById('category-container').classList.remove('d-none');
    document.getElementById('news-container').classList.remove('d-none');

    document.getElementById('btn-news').classList.add('btn-color');
    document.getElementById('btn-blog').classList.remove('btn-color');
})
document.getElementById('btn-blog').addEventListener('click', function(){
    document.getElementById('blog-container').classList.remove('d-none');
    document.getElementById('category-container').classList.add('d-none');
    document.getElementById('news-container').classList.add('d-none');

    document.getElementById('btn-blog').classList.add('btn-color');
    document.getElementById('btn-news').classList.remove('btn-color');
})

const categoryUrl = 'https://openapi.programming-hero.com/api/news/categories';
fetch(categoryUrl)
.then(res => res.json())
.then(data => loadCategoryData(data));

const loadCategoryData = data =>{            
    const categories = data.data.news_category;
    for(const category of categories){
        const categoryId = category.category_id;
        const categoryName = category.category_name;        

        const categoryDiv = document.createElement('div');      
        categoryDiv.innerHTML = `
            <p onclick="fetchNews('${categoryId}', '${categoryName}')" id="category${categoryId}" class="my-cursor category px-2 pb-1">
             ${category.category_name} </p>                    
        `;
        document.getElementById('category-container').appendChild(categoryDiv);

    }            
};

const toggleCategoryColor = (selectedCategoryId) => {
    fetch(categoryUrl)
    .then(res => res.json())
    .then(data => {
        const categories = data.data.news_category;
        for(const category of categories){
            const categoryId = category.category_id;
            if(categoryId != selectedCategoryId ){
                document.getElementById(`category${categoryId}`).classList.remove('category-color');
            }
        }
    });        
    document.getElementById(`category${selectedCategoryId}`).classList.add('category-color');
}

const fetchNews = (categoryId,categoryName) =>{            

    toggleCategoryColor(categoryId);    
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    // .then(data => setNewsUI(data, categoryName, url));
    .then(data => setTimeout(setNewsUI, 300, data, categoryName, url) );    // function call with delay    
};    
// setTimeout(() => {  console.log("World!"); }, 5000);  // console.log with delay


// const showNews = (data, categoryName, url) =>{    
//     document.getElementById('news-container').innerText = ``;    
//     // const newsTitle = data.data[0] ? data.data[0].title : 'No data found';
//     if(data.data.length != 0){ 
//         setNewsUI(data, categoryName, url);
//     }
//     else{
//         document.getElementById('news-container').innerHTML = `<br><br><br><br><br><br>
//          <h3 class="text-center"> No Data Available </h3> `;        
//     }                        
// }; 


const setNewsUI = (data, categoryName, url) =>{  
    document.getElementById('news-container').innerText = ``;    
    const items = data.data;

    items.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    const itemCount = items.length;
    const itemCountDiv = document.createElement('div');                                
    itemCountDiv.innerHTML = `
        <h6 class="bg-light mt-4 mb-5 py-3 ps-4 rounded"> ${itemCount} items found for category ${categoryName} </h6>
    `;
    document.getElementById('news-container').appendChild(itemCountDiv);
        
    for(const item of items) {                
        const  itemId = item._id;               
        const thumbnailImageUrl = item.image_url;
        const newsTitle = item.title;
        const newsDetails = newsTrim(item.details);
        const authorImageUrl = item.author.img;            
        const authorName = item.author.name ? item.author.name: 'No Data Available';                
        const publishDate = item.author.published_date;
        const views = item.total_view ? item.total_view: 'No Data Available';        
                        

        const newsDiv = document.createElement('div');                                
        newsDiv.innerHTML = `
            <div class="d-flex flex-column flex-md-row single-news-block">
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
                        
                        <p id="btn-view-details" onclick="openModal('${url}', '${itemId}')" class="arrow-color my-cursor me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i> </p>
                    </div>
                </div>

            </div>                    
        `;
        document.getElementById('news-container').appendChild(newsDiv);
    }
    toggleSpinner(false);               
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


const openModal = (url,itemId) =>{    
    fetch(url)
    .then(res => res.json())
    .then(data => { 
        const items = data.data;               

        for(const  item of items) {        
            if(item._id === itemId){
                const thumbnailImageUrl = item.image_url;
                const newsTitle = item.title;
                const newsDetails = item.details;                
                const authorImageUrl = item.author.img;                                
                const authorName = item.author.name ? item.author.name: 'No Data Available';
                const publishDate = item.author.published_date;        
                const views = item.total_view ? item.total_view: 'No Data Available';        
                
                document.querySelector('.modal-body').innerHTML = `
                    <h5>${newsTitle}:<br><br></h5> 
                    <img class="img-fluid rounded" src="${thumbnailImageUrl}">
                    <p class="text-muted"> <br>${newsDetails}</p>

                    <h5 class="text-center">  Author  </h5>
                    <img class="d-block w-25 rounded m-auto" src="${authorImageUrl}">

                    <div class="text-center">
                        <h6 class="d-inline-block"> <br> Author Name:  </h6>
                        <p class="d-inline-block mb-5"> ${authorName} </p>
                    <div>

                    <div class="text-start">
                        <h6 class="d-inline-block"> Published Date:  </h6>
                        <p class="d-inline-block mb-0"> ${publishDate} </p>
                    <div>                        
                                        
                    <h6 class="d-inline-block"> Total Views:  </h6>
                    <p class="d-inline-block"> ${views} </p>                    
                `;
            }
        }

        
    });      
};

const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');
        if(isLoading){
            loader.classList.remove('d-none');
        }
        else{
            loader.classList.add('d-none');
        }
}
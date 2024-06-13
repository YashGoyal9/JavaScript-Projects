const userTab = document.querySelector("[data-userweather]");
const searchTab = document.querySelector("[data-searchweather]");
const userContainer =  document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grantlocation-container");
const searchForm = document.querySelector("[data-searchform]");
const loadingScreen =document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".userinfo-container");
const errorImage = document.querySelector(".notfound-image");
const errorText = document.querySelector(".notfound-text");


// initial variables needed 
let currentTab=userTab;
const API_KEY= "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

// initially if coordinates are present 
getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");


        if(!searchForm.classList.contains("active")){
            // kya search form vala container is invisible then make it visible 
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        else{
            //  phle m search vale tab pr tha or ab your weather pr aana chahta hu 
            errorImage.classList.remove("active");
            errorText.classList.remove("active");
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab m your weather vaale tab m aa gya hu , toh weather bhi display krna pdega so lets check local storage first 
            // for corrdinates if we have save them there 
            getfromSessionStorage();

        }

    }
}

userTab.addEventListener("click", () =>{
    // pass clicked tab as input parameter 
    switchTab(userTab);
})


searchTab.addEventListener("click", () =>{
     // pass clicked tab as input parameter 
    switchTab(searchTab);
})




// ye check krega if cooridnates are present in session storage or internal storage 

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");


        // agr coordinates nhi mile 
    if(!localCoordinates){
    grantAccessContainer.classList.add("active");
    }
    else{
        // agr coordinates h to 
        const coordinates= JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
    

}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    // make grantcontainer invisible 
    grantAccessContainer.classList.remove("active");
    // make loader visible 
    loadingScreen.classList.add("active");

    // API CALL 
    try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

            const data= await response.json();
            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");

            // ye function krega ki jo bhi data mila h usse data ko userInfoContainer m render krke jo values milegi use  ui m input krega 
            renderWeatherInfo(data);

    }
    catch(err){
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        console.log("404 Not Found ");
        console.log("Error! Please enter correct data ");
    }

}

function renderWeatherInfo(weatherInfo){
    // firstly we have to fetch the element 

    const cityName=document.querySelector("[data-cityname]");
    const countryIcon=document.querySelector("[data-countryicon]");
    const description=document.querySelector("[data-weatherdescription]");
    const weatherIcon=document.querySelector("[data-weathericon]");
    const temprature =document.querySelector("[data-temprature]");
    const windSpeed =document.querySelector("[data-windspeed]");
    const humidity =document.querySelector("[data-humidity]");
    const cloudiness =document.querySelector("[data-cloudiness]");


    // fetch values from weatherinfo object and put it in ui  
    cityName.innerText = weatherInfo?.name;
    // for country icon we have to use a cdn link 
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    description.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temprature.innerText=`${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all} %`; 
}



function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
        // show an alert for no geolocation support available 
    }
}


function  showPosition(position){
    // console.log(position);
    const userCoordinates = {
      lat : position.coords.latitude,
      lon : position.coords.longitude,
    }
    // save kr diye coordinates 
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    // to show on ui  
    fetchUserWeatherInfo(userCoordinates);
    
 }

const grantAccessButton=document.querySelector("[data-grantaccess]")
grantAccessButton.addEventListener("click", getLocation);



const searchInput=document.querySelector("[data-searchinput]");
// for searchweather function 
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName=searchInput.value;
    if(cityName ==="") return ;
   fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            userInfoContainer.classList.remove("active");
            loadingScreen.classList.remove("active");
            errorImage.classList.add("active");
            errorText.classList.add("active");
        }
        else{
        
        const data=await response.json(); 
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");


        renderWeatherInfo(data);
        }
        
    }
    catch(err){
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        console.log("404 Not Found ");
        console.log("Error! Please enter correct data ");
    }
}

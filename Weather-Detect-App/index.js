// console.log("Hello jee yash ");

// function renderWeatherInfo(data){
//     let newPara=document.createElement('p');
//     newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
    
//     document.body.appendChild(newPara);
// }




// async function fetchWeatherDetails(){
//     // let latitude=15.333;
//     // let longitude=74.0833;
//     const API_KEY= "d1845658f92b31c64bd94f06f7188c9c";


//     try{
//         let city="goa";
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
//         const data= await  response.json();
//         console.log(" Weather data:-> " , data);
    
//         renderWeatherInfo(data);

//     }
    
//     catch(err){

//     }



// }


// async function getCustomWeatherDetails(){

//     try{
//         let latitude=27.8947;
//     let longitude=76.2820;
//     const API_KEY2= "d1845658f92b31c64bd94f06f7188c9c";


//     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY2}&units=metric`);

//     let data=await result.json();

//     console.log(data);
//     }
//     catch(err){

//     }console.log("Error Found" , err);
    
// }



// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No geolocation support");
//     }

// }

// function showPosition(position){
//     let lati= position.coords.latitude;
//     let longi= position.coords.longitude;

//     console.log(lati);
//     console.log(longi);
// }

// // hw 
// // postman tool kyu use krte h or isme kese usko use kr skte h 
// // response dekh skte h , api testing kr skte h ? or kya 





















const PageHeading = document.querySelector("[data-pageHeading]");
const userSearchForm = document.querySelector("[data-searchForm]");
const btnText =document.querySelector(".btntext");
const root = document.documentElement.style;
const btnMode = document.querySelector(".btnmode");
const noResults = document.querySelector(".error");
const searchInput = document.querySelector("[data-userInput]")
const usserInfo = document.querySelector("[data-userInfo]")
const userImage = document.querySelector("[data-userImage]")
const userOriginalName = document.querySelector("[data-userOriginalName]")
const userProfileLink = document.querySelector("[data-userProfileLink]")
const userDescription = document.querySelector("[data-userExperience]")
const userJoinedDate = document.querySelector("[data-userJoinedDate]")
const userContribution = document.querySelector("[data-userContribution]")
const userRepoS = document.querySelector(".repos-container")
const userFollowers = document.querySelector(".followers-container")
const UserFollowing = document.querySelector(".following-container")
const userConnects = document.querySelector("[data-userConnect]")
const userLocation = document.querySelector(".location-container")
const userWebsiteLink = document.querySelector(".website-container")
const userTwitterLink = document.querySelector(".twitter-container")
const userCurrentCompany = document.querySelector(".company-container")

let darkMode=false;
// const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


let userName="YashGoyal9";
fetchUserData(userName);


userSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userName=searchInput.value;
    if(userName==="") return;
    fetchUserData(userName);
}); 


// enter maarte hi result aa jaaye uske liye ek eventlistner 
searchInput.addEventListener("keydown", function(e){
        if(e.key=="Enter"){
            if(userName==="") return;
            fetchUserData(userName);
        }
    },
    false
);

// agr kuch na mile to no result k liye event listener 
searchInput.addEventListener("input",function(){
    noResults.style.display="none";
})


// dark or light mode k liye event listner 
btnMode.addEventListener("click",function(){
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
});

async function fetchUserData(userName) {

    try {
        let response = await fetch(`https://api.github.com/users/${userName}`);
        let data = await response.json();
        renderUserInfo(data);
    }
    catch(err){
        console.log(error);
        // noResults.style.display="block";
        // userName="YashGoyal9";
        // renderUserInfo(userName);
        // console.log("galt h");
    }
}
function renderUserInfo(data){
    if(data.message != "Not Found"){
     noResults.style.display="none";

     function checkNull(param1, param2) {
        if (param1 === "" || param1 === null) {
          param2.style.opacity = 0.5;
          param2.previousElementSibling.style.opacity = 0.5;
        //   iss line m doubt h 
          return false;
        } else {
          return true;
        }
      }

     userImage.src=data?.avatar_url;
    userOriginalName.innerText=data?.name;
    userProfileLink.href=data?.html_url;
    userProfileLink.innerText = '@' + data?.login ;
    userDescription.innerText=data?.bio;

    // date ko format kra h yha se 
    const joinedDate = new Date(data?.created_at);
    const formattedDate = `${joinedDate.toLocaleString('default', { month: 'long' })} ${joinedDate.getDate()}, ${joinedDate.getFullYear()}`;
    userJoinedDate.innerText = "Joined " + formattedDate;

    userRepoS.innerText=data?.public_repos;
    userFollowers.innerText=data?.followers;
    UserFollowing.innerText=data?.following;
    userLocation.innerText=checkNull(data?.location,userLocation)? data?.location:"Not Available";
    userWebsiteLink.innerText= checkNull(data?.blog,userWebsiteLink)? data?.blog:"Not Available";
    userWebsiteLink.href=checkNull(data?.blog,userLocation)? data?.blog:"#";
    userTwitterLink.innerText= checkNull(data?.twitter_username,userTwitterLink)? data?.twitter_username:"Not Available";
    userTwitterLink.href= checkNull(data?.twitter_username,userTwitterLink)? `https://twitter.com/${data?.twitter_username}` :"#";
    userCurrentCompany.innerText= checkNull(data?.company,userCurrentCompany)? data?.company :"Not Available";

    }

    else{
        noResults.style.display="block";
    }
    

}




//INITIALISE UI
function init() {
    //initialise dark-mode variable to false;
    //darkMode = true -> dark mode enable karna h 
    //darMode = false -> light mode enable karna h 
    darkMode = false;
  
    
//   additional feature h ki meri pc ki preference kya lgi h 
    const value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null k andar");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer k andar");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false k andar");
      lightModeProperties();
    }
  
  
    //by default, meri  info show krre h UI pr
    fetchUserData(YashGoyal9);
    
  }
  
  init();


//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    btnText.innerText = "LIGHT";
    btnMode.src = "./sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    // console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", true);
  
    // console.log("setting dark mode to true");
  
  }
  
  //SWITCH TO LIGHT MODE - activateLightMode() 
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    btnText.innerText = "DARK";
    btnMode.src = "./moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    // console.log("darkmode changed to " + darkMode);
  
    localStorage.setItem("dark-mode", false);
    // console.log("setting dark mode to false");
  }


const wrapper = document.querySelector(".wrap"),
inputPart = wrapper.querySelector(".input-txt"),
infoTxt = inputPart.querySelector(".para"),
inputTag = inputPart.querySelector("input");
locateBtn = inputPart.querySelector("button"),
weathIcon = document.querySelector(".weather-sec img");
arrowBck = wrapper.querySelector("header i");

let api;

inputTag.addEventListener("keyup", e =>{

  // if user pressed enter button & input value is not empty then ..

  if(e.key == "Enter" && inputTag.value != ""){
    requestApi(inputTag.value);
  }

});

locateBtn.addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
  }
  else{
    alert("Your browser doesn't supports geolocation api");
  }
});

function onSuccess(point){
  const {latitude,longitude} = point.coords; // we'll get lat & long of device
  const apiKey = "d1afd07dc1364bbcfbc40ec0fc9ac6e1";
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error){
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}


function requestApi(city){
  const apiKey = "d1afd07dc1364bbcfbc40ec0fc9ac6e1";
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData(){
  infoTxt.innerText = "Fetching weather details...";
  infoTxt.classList.add("pending");
  // getting api response & returning it with parsinginto js obj & in another
  // then function calling weatherDetails function with passing api result as argument
  // api will return you many details about the city name entered
  fetch(api).then(response => (response.json()).then(result => weatherDetails(result)));
}


function weatherDetails(info){
   if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputTag.value} isn't a valid city name`;
    }
    else
    {
      // getting the weather details of searched city..

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

     // changing weather icons dynamically using their Id

     if(id == 800){
           weathIcon.src = "imgs/sun.png";
       }else if(id >= 200 && id <= 232){
           weathIcon.src = "imgs/thunder.png";
       }else if(id >= 600 && id <= 622){
           weathIcon.src = "imgs/snow.png";
       }else if(id >= 701 && id <= 781){
           weathIcon.src = "imgs/haze.png";
       }else if(id >= 801 && id <= 804){
           weathIcon.src = "imgs/cloudy-day.png";
       }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
           weathIcon.src = "imgs/rainy.png";
       }


      // passing values in html element..

      wrapper.querySelector(".tmp .num").innerText = Math.floor(temp);
      wrapper.querySelector(".weath").innerText = description;
      wrapper.querySelector(".location span").innerText = `${city},${country}`;
      wrapper.querySelector(".tmp .nums").innerText = Math.floor(feels_like);
      wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
}

arrowBck.addEventListener("click", ()=>{
  wrapper.classList.remove("active");
});

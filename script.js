function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
    }
setInterval(updateTime, 1000);

function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}
document.getElementById("defaultOpen").click();


document.querySelectorAll(".window").forEach(window => {
    dragElement(window);
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.target.classList.contains("closebutton")) {
        return;
    }
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "flex"
}

var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function(e) {
    e.stopPropagation();
    welcomeScreen.style.display = "none";
});
welcomeScreenOpen.addEventListener("click", function() {
    welcomeScreen.style.display = "flex";
});


var notesScreen = document.querySelector("#notes")
var notesScreenClose = document.querySelector("#notesclose")
notesScreenClose.addEventListener("click", function(e) {
    e.stopPropagation();
    notesScreen.style.display = "none";
});
var notesScreenOpen = document.querySelector("#notesopen")
notesScreenOpen.addEventListener("click", function() {
    notesScreen.style.display = "flex";
});


var timerScreen = document.querySelector("#timer")
var timerScreenClose = document.querySelector("#timerclose")
var timerScreenOpen = document.querySelector("#timeropen")
timerScreenClose.addEventListener("click", function(e) {
    e.stopPropagation();
    timerScreen.style.display = "none";
});
timerScreenOpen.addEventListener("click", function() {
    timerScreen.style.display = "flex";
});






const hourContainer = document.querySelector("#hour");
const minContainer = document.querySelector("#min");
const secContainer = document.querySelector("#sec");
const header = document.querySelector("#timerh1");
let timer_set = 0;
let hour = 0;
let min = 0;
let sec = 0;
let interval;
minContainer.addEventListener("change", () => {
  min = parseInt(minContainer.value);
  if (min >= 60) {
    hour = Math.floor(hour + min / 60);
    min = min % 60
  }
  updateUI();
})
secContainer.addEventListener("change", () => {
  sec = parseInt(secContainer.value);
  if (sec >= 60) {
    min = Math.floor(min + sec / 60);
    sec = sec % 60
    if (min > 60) {
      hour = Math.floor(hour + min / 60);
      min = min % 60;
    }
  }
  updateUI();
})
hourContainer.addEventListener("change", () => {
  hour = parseInt(hourContainer.value);
  updateUI();
})

const updateUI = () => {
  hourContainer.value = hour;
  minContainer.value = min;
  secContainer.value = sec;
}
const updateHMS = () => {
  sec = timer_set % 60;
  min = Math.floor(timer_set / 60);
  hour = Math.floor(min / 60);
  min = min % 60;
  updateUI ();
}
const resetTime = () => {
  hour = 0;
  min = 0;
  sec = 0;
  timer_set = 0;
  if (interval) {
    clearInterval(interval);
  }
  hourContainer.removeAttribute("readonly")
  minContainer.removeAttribute("readonly")
  secContainer.removeAttribute("readonly")
  hourContainer.value = "";
  minContainer.value = "";
  secContainer.value = "";
}
const endTicking = () => {
  header.innerText = "Time's up!"
  setTimeout (() => {
    header.innerText = "Timer app"
  }, 3000)
  resetTime();
}
const startTicking = () => {
  if (timer_set > 0) {
        interval = setInterval(() => {
            timer_set -= 1;

            if (timer_set <= 0) {
                endTicking();
                clearInterval(interval);
            }
            updateHMS();
        }, 1000)

    } else {
        endTicking()
    }
}
const startTime = () => {
  hourContainer.setAttribute("readonly", "true");
  minContainer.setAttribute("readonly", "true");
  secContainer.setAttribute("readonly", "true");

  timer_set = hour * 60 * 60 + min * 60 + sec;
  startTicking();
}














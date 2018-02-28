window.onload = function() {
    checkFavorites();
};

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        listFavoriteCakes(myArr);
        checkFavorites();
    }
};
xmlhttp.open("GET", "data/data.json", true);
xmlhttp.send();

function listFavoriteCakes(titleArr) {
    for(var i=1; i<=titleArr.length+1; i++) {
        var id = 'heart' + i;
        var state = localStorage.getItem(id);

        if(state === "true") {
            var element = document.getElementById("favCakes");
            var article = document.createElement("article");
            article.className = "imgContainer grid-33 mobile-grid-100 tablet-grid-50";
            article.innerHTML += "<button id= '"+id+"' class='favoriteHeartGrid' onclick='change(this)'></button>";
            article.innerHTML += "<a href='cake"+i+".html'><img src='img/"+i+".jpg' alt='A cake'><h5>"+ titleArr[i-1] +"</h5></a>";
            element.appendChild(article);
        }

    }
}

function checkFavorites() {
    if (typeof(Storage) !== "undefined") {
        for (var j = 1; j <= 15; j++) {
            var id = "heart" + j;
            var elId = document.getElementById(id);
            var state = localStorage.getItem(id);

            if (state === "true") {
                animateHeartFill(elId);
            } else {
                animateHeartUnFill(elId);
            }

        }
    }
}

function checkFavoritesReChek(id) {
    if (typeof(Storage) !== "undefined") {
        var elId = document.getElementById(id);
        var state = localStorage.getItem(id);

        if (state === "true") {
            animateHeartFill(elId);
        } else {
            animateHeartUnFill(elId);
        }

    }
}

function change(elId) {
    if (typeof(Storage) !== "undefined") {
        var state = localStorage.getItem(elId.id);
        if (state == "null") {
            state = "true";
        }

        if (state === "true") {
            localStorage.setItem(elId.id, "false");
            animateHeartUnFill(elId);
        } else {
            localStorage.setItem(elId.id, "true");
            animateHeartFill(elId);
        }
    }
}

function animateHeartFill(elId) {
    elId.style.backgroundImage = "url('img/heartFill.png')";
    var start = Date.now();
    var interval = setInterval(frameIn, 20);
    function frameIn() {
        var timePassed = Date.now() - start;
        elId.style.opacity = timePassed/500;
        if (timePassed > 500) clearInterval(interval);
    }
}

function animateHeartUnFill(elId) {
    var start = Date.now();
    var interval = setInterval(frameOut, 20);
    function frameOut() {
        var timePassed = Date.now() - start;
        if(timePassed < 200) {
            elId.style.opacity = 1-timePassed/150;
        } else {
            elId.style.opacity = timePassed/500;
        }
        if (timePassed > 200) {
            elId.style.backgroundImage = "url('img/heart.png')";
        }
        if (timePassed > 500) {
            clearInterval(interval);
            elId.style.opacity = 1;
        }
    }
}
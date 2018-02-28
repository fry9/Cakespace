

function postComment(firstName, lastName, comment) {
    var element = document.getElementById("comments");
    var name = document.createElement("b");
    var text = document.createElement("p");
    name.textContent = firstName + ' ' + lastName;
    text.textContent = comment;
    element.appendChild(name);
    element.appendChild(text);
    name.style.opacity = 0;
    text.style.opacity = 0;

    var start = Date.now();
    var interval = setInterval(frameIn, 20);
    function frameIn() {
        var timePassed = Date.now() - start;
        name.style.opacity = timePassed/2000;
        text.style.opacity = timePassed/2000;
        if (timePassed > 2000) {
            clearInterval(interval);
        }
    }
}

function filterSelection(user, filter) {
    var x, i;
    x = document.getElementsById(user + filter);
    changeStyle(c);
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
}

function changeStyle(id) {
    document.getElementById("all").style.backgroundColor = "black";
    document.getElementById("all").style.color = "mediumorchid";
    document.getElementById("all").style.fontWeight = "normal";

    document.getElementById("concerts").style.backgroundColor = "black";
    document.getElementById("concerts").style.color = "mediumorchid";
    document.getElementById("concerts").style.fontWeight = "normal";

    document.getElementById("sports").style.backgroundColor = "black";
    document.getElementById("sports").style.color = "mediumorchid";
    document.getElementById("sports").style.fontWeight = "normal";

    document.getElementById("standup").style.backgroundColor = "black";
    document.getElementById("standup").style.color = "mediumorchid";
    document.getElementById("standup").style.fontWeight = "normal";

    document.getElementById("parties").style.backgroundColor = "black";
    document.getElementById("parties").style.color = "mediumorchid";
    document.getElementById("parties").style.fontWeight = "normal";

    document.getElementById("festivals").style.backgroundColor = "black";
    document.getElementById("festivals").style.color = "mediumorchid";
    document.getElementById("festivals").style.fontWeight = "normal";

    document.getElementById("theater").style.backgroundColor = "black";
    document.getElementById("theater").style.color = "mediumorchid";
    document.getElementById("theater").style.fontWeight = "normal";

    document.getElementById("cinema").style.backgroundColor = "black";
    document.getElementById("cinema").style.color = "mediumorchid";
    document.getElementById("cinema").style.fontWeight = "normal";

    document.getElementById("other").style.backgroundColor = "black";
    document.getElementById("other").style.color = "mediumorchid";
    document.getElementById("other").style.fontWeight = "normal";

    document.getElementById(id).style.backgroundColor = "lightgray";
    document.getElementById(id).style.color = "black";
    document.getElementById(id).style.fontWeight = "bold";
}

// Show filtered elements
function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
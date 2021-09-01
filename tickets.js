function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    //   changeStyle(c);
 //   document.getElementById("showCategory").innerHTML = "hello";
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
}


/*
function changeStyle(c) {
    if ('all' != c) {
        document.getElementById('all').style.backgroundColor = "black";
        document.getElementById('all').style.color = "mediumorchid";
        document.getElementById('all').onmouseover = onclick_mouseOver(c);
        document.getElementById('all').onmouseout = onclick_mouseOut(c);
    }
    if ('cencerts' != c) {
        document.getElementById('concerts').style.backgroundColor = "black";
        document.getElementById('concerts').style.color = "mediumorchid";
        document.getElementById('concerts').onmouseover = onclick_mouseOver(c);
        document.getElementById('concerts').onmouseout = onclick_mouseOut(c);
    }
    if ('sports' != c) {
        document.getElementById('sports').style.backgroundColor = "black";
        document.getElementById('sports').style.color = "mediumorchid";
        document.getElementById('sports').onmouseover = onclick_mouseOver(c);
        document.getElementById('sports').onmouseout = onclick_mouseOut(c);
    }
    if ('standup' != c) {
        document.getElementById('standup').style.backgroundColor = "black";
        document.getElementById('standup').style.color = "mediumorchid";
        document.getElementById('standup').onmouseover = onclick_mouseOver(c);
        document.getElementById('standup').onmouseout = onclick_mouseOut(c);
    }
    if ('parties' != c) {
        document.getElementById('parties').style.backgroundColor = "black";
        document.getElementById('parties').style.color = "mediumorchid";
        document.getElementById('parties').onmouseover = onclick_mouseOver(c);
        document.getElementById('parties').onmouseout = onclick_mouseOut(c);
    }
    if ('festivals' != c) {
        document.getElementById('festivals').style.backgroundColor = "black";
        document.getElementById('festivals').style.color = "mediumorchid";
        document.getElementById('festivals').onmouseover = onclick_mouseOver(c);
        document.getElementById('festivals').onmouseout = onclick_mouseOut(c);
    }
    if ('theater' != c) {
        document.getElementById('theater').style.backgroundColor = "black";
        document.getElementById('theater').style.color = "mediumorchid";
        document.getElementById('theater').onmouseover = onclick_mouseOver(c);
        document.getElementById('theater').onmouseout = onclick_mouseOut(c);
    }
    if ('cinema' != c) {
        document.getElementById('cinema').style.backgroundColor = "black";
        document.getElementById('cinema').style.color = "mediumorchid";
        document.getElementById('cinema').onmouseover = onclick_mouseOver(c);
        document.getElementById('cinema').onmouseout = onclick_mouseOut(c);
    }
    if ('kids-shows' != c) {
        document.getElementById('kids-shows').style.backgroundColor = "black";
        document.getElementById('kids-shows').style.color = "mediumorchid";
        document.getElementById('kids-shows').onmouseover = onclick_mouseOver(c);
        document.getElementById('kids-shows').onmouseout = onclick_mouseOut(c);
    }
    if ('other' != c) {
        document.getElementById('other').style.backgroundColor = "black";
        document.getElementById('other').style.color = "mediumorchid";
        document.getElementById('other').style.backgroundColor.onmouseover = "mediumorchid";
        document.getElementById('other').style.color.onmouseover = "black";
        document.getElementById('other').style.backgroundColor.onmouseout = "transparent";
        document.getElementById('other').style.color.onmouseout = "transparent";
    }
    document.getElementById(c).style.backgroundColor = "lightgray";
    document.getElementById(c).style.color = "black";
    document.getElementById(c).style.backgroundColor.onmouseover = "lightgray";
    document.getElementById(c).style.color.onmouseover = "black";
    document.getElementById(c).style.backgroundColor.onmouseout = "lightgray";
    document.getElementById(c).style.color.onmouseout = "black";
}

function onclick_mouseOver(id) {
    document.getElementById(id).style.backgroundColor = "mediumorchid";
    document.getElementById(id).style.color = "black";
}

function onclick_mouseOut(c) {
    document.getElementById(c).style.backgroundColor = "black";
    document.getElementById(c).style.color = "mediumorchid";
}
/*
function mouseOut(c) {
    if ('all' != c) {
        document.getElementById('all').style.backgroundColor = "black";
        document.getElementById('all').style.color = "mediumorchid";
    }
    if ('cencerts' != c) {
        document.getElementById('concerts').style.backgroundColor = "black";
        document.getElementById('concerts').style.color = "mediumorchid";
    }
    if ('sports' != c) {
        document.getElementById('sports').style.backgroundColor = "black";
        document.getElementById('sports').style.color = "mediumorchid";
    }
    if ('standup' != c) {
        document.getElementById('standup').style.backgroundColor = "black";
        document.getElementById('standup').style.color = "mediumorchid";
    }
    if ('parties' != c) {
        document.getElementById('parties').style.backgroundColor = "black";
        document.getElementById('parties').style.color = "mediumorchid";
    }
    if ('festivals' != c) {
        document.getElementById('festivals').style.backgroundColor = "black";
        document.getElementById('festivals').style.color = "mediumorchid";
    }
    if ('theater' != c) {
        document.getElementById('theater').style.backgroundColor = "black";
        document.getElementById('theater').style.color = "mediumorchid";
    }
    if ('cinema' != c) {
        document.getElementById('cinema').style.backgroundColor = "black";
        document.getElementById('cinema').style.color = "mediumorchid";
    }
    if ('kids-shows' != c) {
        document.getElementById('kids-shows').style.backgroundColor = "black";
        document.getElementById('kids-shows').style.color = "mediumorchid";
    }
    if ('other' != c) {
        document.getElementById('other').style.backgroundColor = "black";
        document.getElementById('other').style.color = "mediumorchid";
    }
}

function mouseOver(c) {
    if ('all' != c) {
        document.getElementById('all').style.backgroundColor = "mediumorchid";
        document.getElementById('all').style.color = "black";
    }
    if ('cencerts' != c) {
        document.getElementById('concerts').style.backgroundColor = "mediumorchid";
        document.getElementById('concerts').style.color = "black";
    }
    if ('sports' != c) {
        document.getElementById('sports').style.backgroundColor = "mediumorchid";
        document.getElementById('sports').style.color = "black";
    }
    if ('standup' != c) {
        document.getElementById('standup').style.backgroundColor = "mediumorchid";
        document.getElementById('standup').style.color = "black";
    }
    if ('parties' != c) {
        document.getElementById('parties').style.backgroundColor = "mediumorchid";
        document.getElementById('parties').style.color = "black";
    }
    if ('festivals' != c) {
        document.getElementById('festivals').style.backgroundColor = "mediumorchid";
        document.getElementById('festivals').style.color = "black";
    }
    if ('theater' != c) {
        document.getElementById('theater').style.backgroundColor = "mediumorchid";
        document.getElementById('theater').style.color = "black";
    }
    if ('cinema' != c) {
        document.getElementById('cinema').style.backgroundColor = "mediumorchid";
        document.getElementById('cinema').style.color = "black";
    }
    if ('kids-shows' != c) {
        document.getElementById('kids-shows').style.backgroundColor = "mediumorchid";
        document.getElementById('kids-shows').style.color = "black";
    }
    if ('other' != c) {
        document.getElementById('other').style.backgroundColor = "mediumorchid";
        document.getElementById('other').style.color = "black";
    }
}*/

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

/*const ticketsContainer = document.getElementByClassName("tickets");
const tickets = document.getElementByClassName("filterDiv");
const search = document.getElementById("search");
serach.addEventListener("keyup", (e) => {
/*    e.preventDefault();
    const searchString = e.target.toLowerCase();
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].classList.contains(searchValue)) {
            tickets[i].style.dispaly = "inline-block";
        } else if (searchValue == "") {
            tickets[i].style.dispaly = "inline-block";
        } else {
            tickets[i].style.dispaly = "none"
        }
    }
    const searchString = e.target.toLowerCase();
    const filterTickets = ticketsContainer.filter(())
});*/


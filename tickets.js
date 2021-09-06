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
}

// Show filtered elements
function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    console.log(arr1);
    arr2 = name.split(" ");
    console.log(arr2);
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
    console.log(arr1);
    arr2 = name.split(" ");
    console.log(arr2);
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function sortList() {
    var ul, i, switching, li, shouldSwitch;
    ul = document.getElementById("tickets");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      li = ul.getElementsByTagName("li");
      // Loop through all list-items:
      for (i = 0; i < (li.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (li[i].getElementsByTagName("h2").innerHTML.toLowerCase() > li[i + 1].getElementsByTagName("h2").innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        li[i].parentNode.insertBefore(li[i + 1], li[i]);
        switching = true;
      }
    }
  }

//search bar
function search() {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('keyup', filterNames);
}
function filterNames() {
    let searchValue = document.getElementById('search').value.toUpperCase();
    let ul = document.getElementById('tickets');
    let li = ul.querySelectorAll('li.filterDiv');

    for (let i = 0; i < li.length; i++) {
        let eventName = li[i].getElementsByTagName('h2')[0];
        if (eventName.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            li[i].style.display = 'inline-block';
        } else {
            li[i].style.display = 'none';
        }
    }
    if (searchValue = "") {
        li.style.display = 'none';
        filterSelection('all');
    }
}
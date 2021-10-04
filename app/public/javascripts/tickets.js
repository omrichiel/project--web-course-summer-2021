function filterSelection(c) {
    var i;
    let ul = document.getElementById('tickets');
    let li = ul.querySelectorAll('li.filterDiv');
    if (c == "all") c = "";
    // show only lis of the c category and hide the rest
    for (i = 0; i < li.length; i++) {
        if (li[i].className.indexOf(c) > -1){
            li[i].style.display = 'inline-block';
        } else {
            li[i].style.display = 'none';
        }
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

//search bar
function search() {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('keyup', filterNames);
}
function filterNames() {
    let searchValue = document.getElementById('search').value.toUpperCase();
    let ul = document.getElementById('tickets');
    let li = ul.querySelectorAll('li.filterDiv');
    
    //show lis (tickets) that the event name contains the search value
    for (let i = 0; i < li.length; i++) {
        let eventName = li[i].getElementsByTagName('h2')[0];
        if (eventName.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
            li[i].style.display = 'inline-block';
        } else {
            li[i].style.display = 'none';
        }
    }
}
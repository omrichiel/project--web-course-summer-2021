function showPassword() {
    var x = document.getElementById("password");
    if (x.type == "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}
let apiUser = "http://localhost:3000/user";

function login() {
    getUser(handleLogin);
}

function getUser(callback) {
    fetch(apiUser).then(function(res) {
        return res.json().then(callback);
    });
}

function handleLogin(data) {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = data.find(user => user.username == username && user.password == password);
    
    if (user) {
        alert("Đăng nhập thành công");
        window.location.href = "./index.html";
    } else {
        alert("Đăng nhập thất bại");
    }
}

function signup() {
    handleSignup();
}

function createUser(data) {
    fetch(apiUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function(res) {
        return res.json();
    });

    if (data) {
        alert("Đăng ký thành công");
    }
}

function handleSignup() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let user = {
        username: username.value,
        password: password.value
    };
    createUser(user);
}
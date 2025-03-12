async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginButton = document.getElementById("login-button");
    
    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    
    loginButton.disabled = true;
    
    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem("token", data.data.token);
            alert("Đăng nhập thành công!");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Đăng nhập thất bại!");
        }
    } catch (error) {
        alert("Lỗi kết nối, vui lòng thử lại sau!");
        console.error("Lỗi:", error);
    }
    
    loginButton.disabled = false;
}

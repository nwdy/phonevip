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

        if (response.ok && data.data && data.data.token) {
            const token = data.data.token;

            // Lưu token vào localStorage
            localStorage.setItem("accessToken", token);

            // Giải mã phần payload của JWT để lấy vai trò
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Tách chuỗi scp thành mảng
            let roles = [];
            if (payload.scp) {
                roles = payload.scp.replace("[", "").replace("]", "").split(",").map(r => r.trim());
            }

            if (roles.includes("ROLE_ADMIN")) {
                alert("ADMIN Đăng nhập thành công!");
                window.location.href = "adminManageProduct.html";
            } else if (roles.includes("ROLE_USER")) {
                alert("USER Đăng nhập thành công!");
                window.location.href = "index.html";
            }
        } else {
            alert(data.message || "Đăng nhập thất bại!");
        }
    } catch (error) {
        alert("Lỗi kết nối, vui lòng thử lại sau!");
        console.error("Lỗi:", error);
    }

    loginButton.disabled = false;
}

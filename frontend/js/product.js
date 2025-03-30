document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    
    if (!productId) {
        console.error("Không tìm thấy ID sản phẩm");
        document.querySelector(".information").innerHTML = "<p>Lỗi: Không tìm thấy sản phẩm.</p>";
        return;
    }
    
    const apiUrl = `http://localhost:8080/products/${productId}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // if (!data || !data.id || !data.name || !data.imageUrl || !data.price || !data.rating || !data.description) {
        //     throw new Error("Dữ liệu sản phẩm không hợp lệ");
        // }
        
        console.log(data);

        document.querySelector(".product-title").textContent = data.data.name;
        document.querySelector(".product-info p").textContent = `${data.data.rating} ⭐ | 50 rating`;
        document.querySelector(".price").textContent = `${data.data.price} đ`;
        document.querySelector(".product-description").innerHTML = `<p>Thông tin sản phẩm:</p><p>${data.data.description}</p>`;
        document.querySelector(".product-image img").src = `../images/${data.data.imageUrl}`;
        document.querySelector(".product-image img").alt = data.data.name;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        document.querySelector(".information").innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</p>";
    }
});

let quantity = 1;

function updateQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById("quantity").innerText = quantity;
}

async function fetchToken() {
    try {
        const response = await fetch("http://localhost:8080/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        return data.data.token;
    } catch (error) {
        console.error("Lỗi khi lấy token:", error);
        return null;
    }
}

async function addToCart() {
    try {
        let token = localStorage.getItem("token");
        if (!token) {
            token = await fetchToken();
        }
        
        if (!token) {
            console.error("Không thể lấy token, dừng thêm vào giỏ hàng.");
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }

        const productId = new URLSearchParams(window.location.search).get("id");
        const quantity = parseInt(document.getElementById("quantity").innerText, 10);
        
        if (!productId) {
            console.error("Không tìm thấy ID sản phẩm.");
            return;
        }

        const response = await fetch("http://localhost:8080/carts/me/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Thêm vào giỏ hàng thành công!");
    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        alert(`Có lỗi: ${error.message || "Không xác định"}`);
    }
}
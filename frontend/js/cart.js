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

document.addEventListener("DOMContentLoaded", async function () {
    await loadCart();
});

async function loadCart() {
    let token = localStorage.getItem("token");
    if (!token) {
        token = await fetchToken();
    }
    
    if (!token) {
        console.error("Không thể lấy token, dừng tải dữ liệu người dùng.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/carts/me", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const cart = await response.json();
        console.log(cart);
        const cartItems = cart.data.cartItems || [];
        // const totalPrice = cart.data.totalPrice || 0;
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        let totalPrice = 0, totalQuantity = 0;
        
        cartItems.forEach(item => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <input type="checkbox" class="cart-checkbox" data-id="${item.cartItemId}" ${item.selected ? "checked" : ""}>
                    <img src="../images/${item.imageUrl}" alt="${item.productName}">
                    <div class="cart-info">
                        <p>${item.productName}</p>
                        <p class="price">${item.price.toLocaleString()} đ</p>
                    </div>
                    <div class="quantity">
                        <button onclick="updateQuantity(${item.cartItemId}, -1)">-</button>
                        <span id="quantity-${item.cartItemId}">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.cartItemId}, 1)">+</button>
                    </div>
                    <div class="delete-button" onclick="deleteItem(${item.cartItemId})">🗑️</div>
                </div>`;
            
            if (item.selected) {
                totalPrice += item.price * item.quantity;
                totalQuantity += item.quantity;
            }
        });
        
        document.getElementById("total-price").innerText = `Tổng giá trị đơn hàng: ${totalPrice.toLocaleString()} đ`;
        document.getElementById("total-quantity").innerText = `Số lượng sản phẩm: ${totalQuantity}`;
        document.querySelectorAll(".cart-checkbox").forEach(checkbox => {
            checkbox.addEventListener("change", updateTotal);
        });
    } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        alert(`Có lỗi ${error.message || "Không xác định"}`);
    }
}

function updateTotal() {
    let totalPrice = 0, totalQuantity = 0;
    document.querySelectorAll(".cart-checkbox:checked").forEach(checkbox => {
        const item = checkbox.closest(".cart-item");
        const price = parseInt(item.querySelector(".price").innerText.replace(/\D/g, ""));
        const quantity = parseInt(item.querySelector("span[id^='quantity']").innerText);
        totalPrice += price * quantity;
        totalQuantity += quantity;
    });
    document.getElementById("total-price").innerText = `Tổng giá trị đơn hàng: ${totalPrice.toLocaleString()} đ`;
    document.getElementById("total-quantity").innerText = `Số lượng sản phẩm: ${totalQuantity}`;
}

function selectAll() {
    document.querySelectorAll(".cart-checkbox").forEach(checkbox => {
        checkbox.checked = true;
    });
    updateTotal();
}

function deleteSelected() {
    document.querySelectorAll(".cart-checkbox:checked").forEach(checkbox => {
        deleteItem(checkbox.getAttribute("data-id"));
    });
}

async function updateQuantity(cartItemId, change) {
    try {
        const token = localStorage.getItem("token") || await fetchToken();
        if (!token) throw new Error("Không có token hợp lệ");

        const quantityElement = document.getElementById(`quantity-${cartItemId}`);
        let currentQuantity = parseInt(quantityElement.innerText) || 1;
        let newQuantity = currentQuantity + change;

        if (newQuantity < 1) return; // Không cho giảm nhỏ hơn 1

        const response = await fetch(`http://localhost:8080/carts/me/cartItems/${cartItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ quantity: newQuantity })
        });

        const responseData = await response.json();
        console.log("Server Response:", responseData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${responseData.message || "Unknown error"}`);
        }

        // const checkbox = document.querySelector(`.cart-checkbox[data-id='${cartItemId}']`);
        // if (checkbox) checkbox.checked = true;

        await loadCart();
    } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
    }
}

async function deleteItem(cartItemId) {
    try {
        const token = localStorage.getItem("token") || await fetchToken();
        if (!token) throw new Error("Không có token hợp lệ");

        const response = await fetch(`http://localhost:8080/carts/me/cartItems/${cartItemId}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await loadCart();
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
    }
}
// Hàm gọi API để lấy danh sách đơn hàng
async function fetchOrders() {
    try {
        const response = await fetch("http://localhost:8080/orders");
        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        const orders = await response.json();
        populateOrderTable(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// Hàm hiển thị dữ liệu vào bảng danh sách đơn hàng
function populateOrderTable(orders) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ

    orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderCode}</td>
            <td>${order.user.name}</td>
            <td>${order.totalPrice.toLocaleString()} VND</td>
            <td>${order.paymentStatus}</td>
            <td>${order.transactionNo}</td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="btn-view" onclick="showOrderDetails('${order.orderCode}')">Xem Chi Tiết</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm hiển thị chi tiết đơn hàng
async function showOrderDetails(orderCode) {
    try {
        const response = await fetch(`http://localhost:8080/orders/${orderCode}/items`);
        if (!response.ok) {
            throw new Error("Failed to fetch order details");
        }
        const orderItems = await response.json();

        const orderDetailsDiv = document.getElementById("order-details");
        const orderCodeSpan = document.getElementById("order-code");
        const orderDetailsBody = document.getElementById("order-details-body");

        // Cập nhật mã đơn hàng
        orderCodeSpan.textContent = orderCode;

        // Xóa dữ liệu cũ
        orderDetailsBody.innerHTML = "";

        // Thêm dữ liệu mới
        orderItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.order.id}</td>
                <td>${item.quantity}</td>
            `;
            orderDetailsBody.appendChild(row);
        });

        // Hiển thị bảng chi tiết
        orderDetailsDiv.style.display = "block";
    } catch (error) {
        console.error("Error fetching order details:", error);
    }
}

// Gọi hàm fetchOrders khi tải trang
document.addEventListener("DOMContentLoaded", fetchOrders);
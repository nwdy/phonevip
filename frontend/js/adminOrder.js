// Hàm gọi API để lấy danh sách đơn hàng
async function fetchOrders() {
    try {
        const response = await fetch("http://localhost:8080/orders");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const apiResponse = await response.json(); // Lấy phản hồi từ API
        const orders = apiResponse.data; // Lấy danh sách đơn hàng từ trường `data`
        populateOrderTable(orders);
    } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error);
    }
}

// Hàm hiển thị dữ liệu vào bảng danh sách đơn hàng
function populateOrderTable(orders) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // Xóa dữ liệu cũ

    orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.user.id}</td>
            <td>${order.orderCode}</td>
            <td>${order.totalPrice.toLocaleString()} đ</td>
            <td>${order.paymentStatus}</td>
            <td>${order.transactionNo}</td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Gọi hàm fetchOrders khi tải trang
document.addEventListener("DOMContentLoaded", fetchOrders);
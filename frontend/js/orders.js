// Hàm lấy token
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

// Hàm gọi API để lấy lịch sử đơn hàng
async function fetchOrderHistory() {
    let token = localStorage.getItem("token");
    if (!token) {
        token = await fetchToken();
    }

    if (!token) {
        console.error("Không thể lấy token, dừng tải lịch sử đơn hàng.");
        document.getElementById('orders-container').innerHTML = '<p>Lỗi khi lấy token. Vui lòng thử lại sau.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/orders/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const apiResponse = await response.json();
        const orders = apiResponse.data;

        console.log(apiResponse);

        displayOrders(orders); // Hiển thị danh sách đơn hàng
    } catch (error) {
        console.error('Lỗi khi tải lịch sử đơn hàng:', error);
        document.getElementById('orders-container').innerHTML = '<p>Lỗi khi tải lịch sử đơn hàng. Vui lòng thử lại sau.</p>';
    }
}

// Hàm hiển thị danh sách đơn hàng
async function displayOrders(orders) {
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = ''; // Xóa nội dung cũ

    for (const order of orders) {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');
        orderElement.setAttribute('data-order-id', order.orderId); // Thêm thuộc tính để xác định đơn hàng
        orderElement.innerHTML = `
            <p><strong>Mã đơn:</strong> ${order.orderCode}</p>
            <p><strong>Trạng thái thanh toán:</strong> ${order.status}</p>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <p><strong>Số điện thoại:</strong> ${order.phoneNumber}</p>
            <p><strong>Giá trị đơn hàng:</strong> ${order.totalPrice.toLocaleString()} đ</p>
            <p><strong>Thời gian đặt hàng:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
        `;

        // Gọi API để lấy chi tiết đơn hàng
        const orderDetails = await fetchOrderDetails(order.orderId);

        // Nếu có chi tiết đơn hàng, hiển thị bên dưới
        if (orderDetails) {
            const detailsElement = document.createElement('div');
            detailsElement.classList.add('order-details');
            detailsElement.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orderDetails.map((item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.productName || 'Không xác định'}</td>
                                <td>${(item.productPrice || 0).toLocaleString()} đ</td>
                                <td>${item.quantity || 1}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            orderElement.appendChild(detailsElement);
        }

        // Thêm nút "Đánh giá" nếu trạng thái đơn hàng là "Thành công"
        if (order.status === 'COMPLETED') {
            const reviewButton = document.createElement('button');
            reviewButton.classList.add('review-button');
            reviewButton.textContent = 'Đánh giá';
            reviewButton.addEventListener('click', () => {
                window.location.href = `rating.html?orderId=${order.orderId}`;
            });
            orderElement.appendChild(reviewButton);
        }

        ordersContainer.appendChild(orderElement);
    }
}

// Hàm gọi API để lấy chi tiết đơn hàng
async function fetchOrderDetails(orderId) {
    let token = localStorage.getItem("token");
    if (!token) {
        token = await fetchToken();
    }

    if (!token) {
        console.error("Không thể lấy token, dừng tải chi tiết đơn hàng.");
        return null;
    }

    try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const apiResponse = await response.json();
        return apiResponse.data; // Trả về danh sách sản phẩm
    } catch (error) {
        console.error('Lỗi khi tải chi tiết đơn hàng:', error);
        return null;
    }
}

// Gọi API để tải lịch sử đơn hàng khi trang được tải
fetchOrderHistory();
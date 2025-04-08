document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.href;

    // Kiểm tra nếu URL chứa các tham số từ VNPay
    if (currentUrl.includes("vnp_Amount")) {
        // Chuyển hướng đến payment-status.html và giữ lại các tham số
        const redirectUrl = "payment-status.html" + currentUrl.substring(currentUrl.indexOf("?"));
        window.location.href = redirectUrl;
    } else {
        alert("Không tìm thấy thông tin thanh toán.");
    }
});
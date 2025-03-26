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
        document.querySelector(".product-info p").textContent = `${data.data.rating} sao | 50 rating`;
        document.querySelector(".price").textContent = `${data.data.price} đ`;
        document.querySelector(".product-description").innerHTML = `<p>Thông tin sản phẩm:</p><p>${data.data.description}</p>`;
        document.querySelector(".product-image img").src = `../images/${data.data.imageUrl}`;
        document.querySelector(".product-image img").alt = data.data.name;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        document.querySelector(".information").innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</p>";
    }
});

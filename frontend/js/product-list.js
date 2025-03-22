async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        console.log(data);
        
        // if (!data.products || !Array.isArray(data.products)) {
        //     throw new Error('Invalid response format: Missing or incorrect "products" field');
        // }
        
        displayProducts(data.data);
    } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        document.getElementById('product-list').innerHTML = '<p>Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</p>';
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        if (!product.id || !product.name || !product.imageUrl || !product.price) {
            console.warn('Bỏ qua sản phẩm do dữ liệu không hợp lệ:', product);
            return;
        }
        
        const productItem = document.createElement('div');
        productItem.classList.add('product');
        productItem.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="../images/${product.imageUrl}" alt="${product.name}">
                <ul>
                    <li>${product.name}</li>
                    <li>${product.price.toLocaleString()} đ</li>
                </ul>
            </a>
        `;
        productList.appendChild(productItem);
    });
}

fetchProducts();

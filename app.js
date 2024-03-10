const productListElement = document.getElementById('product-list');
const productDetailElement = document.getElementById('product-detail');

function fetchProducts() {
    fetch('https://fipo.equisd.com/api/products.json')
        .then(response => response.json())
        .then(data => {
            if (data.objects && Array.isArray(data.objects)) {
                displayProducts(data.objects);
            } else {
                console.error('Products not found or invalid format');
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    productListElement.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.textContent = product.name;
        productElement.onclick = () => displayProductDetail(product);
        productListElement.appendChild(productElement);
    });
}

function displayProductDetail(product) {
    productDetailElement.style.display = 'flex';
    productDetailElement.innerHTML = `
        <div>
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <img src="${product.avatar}" alt="${product.name}" style="max-width: 600px; height: auto; border-radius: 4px;" />
        </div>
    `;
    productDetailElement.scrollTop = 0;
}

fetchProducts();

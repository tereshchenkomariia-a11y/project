const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPriceEl = document.getElementById('totalPrice');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = [];

openCartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

addToCartBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseInt(e.target.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
        cartModal.classList.add('open');
    });
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">Кошик порожній</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small style="color: var(--text-muted);">${item.price} грн × ${item.quantity}</small>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size: 18px; padding: 5px;">&times;</button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartCount.textContent = totalCount;
    totalPriceEl.textContent = total + ' грн';
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCart();
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
        return;
    }
    alert('Дякуємо! Ваше замовлення в NORI успішно оформлене. Менеджер зв\'яжеться з вами.');
    cart = [];
    updateCart();
    cartModal.classList.remove('open');
});
document.addEventListener('DOMContentLoaded', () => {
    // Object to store product prices
    const productPrices = {
        // Fruits
        'Watermelon': 1.28,
        'Mango': 1.39,
        'Papaya': 3.14,
        'Pineapple': 3.31,
        'Apple': 0.89,
        'Grape': 3.36,
        // Vegetables
        'Pumpkin': 1.41,
        'Cucumber': 1.29,
        'Potato': 1.29,
        'Chili': 1.25,
        'Beetroot': 3.08,
        'Snake Gourd': 1.32,
        'Spinach': 2.37,
        // Dairy Produce
        'Cheese': 2.30,
        'Curd': 1.66,
        'Yoghurt': 3.50,
        'Mozzarella': 28.00,
        'Strawberry Milk': 1.34,
        'Full Cream Milk': 12.00,
        // Meat and Seafood
        'Broiler Chicken': 6.51,
        'Salaya': 12.00,
        'Crab': 19.45,
        'Pork': 8.37,
        'Beef': 15.50,
        'Linna': 13.40,
        // Baking and Cooking Ingredients
        'Yeast': 1.17,
        'Margarine': 1.56,
        'Whole Purpose Flour': 14.95,
        'Pasta': 2.05,
        'Oil': 0.77,
        'Masala': 6.00
    };

    // Array to store items added to the cart
    let cart = [];

    // Get all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.order-item button');

    // Get the cart table body element
    const cartTableBody = document.querySelector('#cart-table tbody');

    // Function to add item to the cart
    function addItemToCart(productName, quantity) {
        const price = productPrices[productName] * quantity;
        cart.push({ productName, quantity, price });
        updateCart();
    }

    // Function to update the cart totals and table
    function updateCart() {
        let totalQuantity = 0;
        let totalPrice = 0;

        // Clear the current table content
        cartTableBody.innerHTML = '';

        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price;

            // Create a new row for each item in the cart
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        // Add the total price row at the bottom of the table
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="2"><strong>Total Price</strong></td>
            <td><strong>$${totalPrice.toFixed(2)}</strong></td>
        `;
        cartTableBody.appendChild(totalRow);

        // Update the total price element
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Add event listener to each "Add to Cart" button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const orderItem = event.target.closest('.order-item');
            const productName = orderItem.querySelector('select').value;
            const quantityInput = orderItem.querySelector('input[type="number"]');
            const quantity = parseFloat(quantityInput.value);

            if (!isNaN(quantity) && quantity > 0) {
                addItemToCart(productName, quantity);
                quantityInput.value = ''; // Clear the input field
            } else {
                alert('Please enter a valid quantity');
            }
        });
    });

    // Add event listeners to update the price display when quantity changes
    const quantityInputs = document.querySelectorAll('.order-item input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const orderItem = event.target.closest('.order-item');
            const productName = orderItem.querySelector('select').value;
            const quantity = parseFloat(event.target.value);
            const priceDisplay = orderItem.querySelector('span');

            if (!isNaN(quantity) && quantity > 0) {
                const price = productPrices[productName] * quantity;
                priceDisplay.textContent = price.toFixed(2);
            } else {
                priceDisplay.textContent = '0.00';
            }
        });
    });

    // Add event listeners to reset the price when a new product is selected
    const productSelects = document.querySelectorAll('.order-item select');
    productSelects.forEach(select => {
        select.addEventListener('change', (event) => {
            const orderItem = event.target.closest('.order-item');
            const priceDisplay = orderItem.querySelector('span');
            const quantityInput = orderItem.querySelector('input[type="number"]');

            // Reset price display and clear quantity input
            priceDisplay.textContent = '0.00';
            quantityInput.value = '';
        });
    });

    // Function to save favorites to local storage
    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(cart));
        alert('Favorites saved!');
    }

    // Function to apply favorites from local storage
    function applyFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        if (favorites) {
            cart = favorites; // Replace current cart with saved favorites
            updateCart(); // Recalculate totals and update the cart table

            // Update the dropdowns with the favorite items
            favorites.forEach(item => {
                const orderItem = document.querySelector(`select option[value="${item.productName}"]`).closest('.order-item');
                if (orderItem) {
                    const quantityInput = orderItem.querySelector('input[type="number"]');
                    quantityInput.value = item.quantity;
                    const priceDisplay = orderItem.querySelector('span');
                    const price = productPrices[item.productName] * item.quantity;
                    priceDisplay.textContent = price.toFixed(2);
                }
            });
        }

        // Show message that favorites have been applied
        alert('Favorites applied!');
    }

    document.getElementById('save-favorites').addEventListener('click', saveFavorites);
    document.getElementById('apply-favorites').addEventListener('click', applyFavorites);
});

const payButton = document.querySelector('button[type="submit"]');
payButton.addEventListener('click', (event) => {
    event.preventDefault();

    const formFields = document.querySelectorAll('form input[required], form textarea[required]');
    const allFieldsFilled = Array.from(formFields).every(field => field.value.trim() !== '');

    if (allFieldsFilled) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2); // 2 days from now
        alert(`Thank you for your purchase! Your order will be delivered on ${deliveryDate.toDateString()}.`);
    } else {
        alert('Please fill all required fields correctly.');
    }
});






























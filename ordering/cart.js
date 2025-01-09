// script.js

// FoodItem class definition
class FoodItem {
    constructor(name, price, id, qty = 1) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.qty = qty;
    }
}

// FoodCart class definition
class FoodCart {
    constructor() {
        this.items = [];
    }

    addToCart(name, price, id) {
        const existingItemIndex = this.items.findIndex(item => item.id === id);
        
        if (existingItemIndex > -1) {
            // If item already exists, increase the quantity
            this.items[existingItemIndex].qty += 1;
        } else {
            // If item does not exist, create a new item and add to cart
            const newItem = new FoodItem(name, price, id);
            this.items.push(newItem);
        }
        this.updateCartDisplay();
    }

    removeFromCart(index) {
        this.items.splice(index, 1);
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartList = document.getElementById('cart-items');
        const totalDisplay = document.getElementById('total');
        
        // Clear the cart display
        cartList.innerHTML = '';
        let total = 0;

        // Populate the cart display
        this.items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price} (Qty: ${item.qty})`;
            
            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => this.removeFromCart(index);
            
            listItem.appendChild(removeButton);
            cartList.appendChild(listItem);
            
            total += item.price * item.qty; // Calculate total
        });

        // Display the total price
        totalDisplay.textContent = `Total: $${total}`;
    }
}

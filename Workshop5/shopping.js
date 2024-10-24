// shopping.js
// This script calculates an order total.

// Function called when the form is submitted.
// Function performs the calculation and returns false.
function calculate() {
    'use strict'; 

    // For storing the order total:
    var total;

    // Get references to the form values:
    var quantity = document.getElementById('quantity');
    var price = document.getElementById('price');
    var tax = document.getElementById('tax');
    var discount = document.getElementById('discount');
    var shipping = document.getElementById('shipping');

    var quantityInt = parseInt(quantity.value);
    var priceFloat = parseFloat(price.value);
    var taxFloat = parseFloat(tax.value);
    var discountFloat = parseFloat(discount.value);
    var shippingFloat = parseFloat(shipping.value)

    // Calculate the initial total:
    total = quantityInt * priceFloat;
    console.log("total before tax: " + total);

    // Make the tax rate easier to use:
    taxFloat = taxFloat / 100;
    taxFloat = taxFloat + 1;

    // Factor in the tax:
    total = total * taxFloat;
    console.log("total after tax: " + total);

    // Factor in the discount:
    if (quantityInt > 100) {
        total = total - (2 * discountFloat);
        discount.value = `${(2 * discountFloat).toFixed(2)}`;
    } else {
        total = total - discountFloat;
        discount.value = discountFloat.toFixed(2);
    }
    total = total + shippingFloat;
    console.log("total after discount: " + total);

    // Format the total to two decimal places:
    total = total.toFixed(2);

    // Display the total:
    document.getElementById('total').value = total;

    // Return false to prevent submission:
    return false;

} // End of calculate() function.

// Function called when the window has been loaded.
// Function needs to add an event listener to the form.
function init() {
    'use strict';

    // Add an event listener to the form:
    var theForm = document.getElementById('theForm');
    
    quantity.value = 1
    price.value = ''
    tax.value = ''
    discount.value = ''
    shipping.value = ''


     if(theForm.addEventListener){
        theForm.addEventListener("submit", calculate ,false);
     }


} // End of init() function.

// Assign an event listener to the window's load event:
window.onload = init;
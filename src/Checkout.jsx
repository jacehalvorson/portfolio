import React from 'react';
import './Checkout.css';

const states = [
   { value: 'AL', label: 'Alabama' },
   { value: 'AK', label: 'Alaska' },
   { value: 'AZ', label: 'Arizona' },
   { value: 'AR', label: 'Arkansas' },
   { value: 'CA', label: 'California' },
   { value: 'CO', label: 'Colorado' },
   { value: 'CT', label: 'Connecticut' },
   { value: 'DE', label: 'Delaware' },
   { value: 'DC', label: 'District Of Columbia' },
   { value: 'FL', label: 'Florida' },
   { value: 'GA', label: 'Georgia' },
   { value: 'HI', label: 'Hawaii' },
   { value: 'ID', label: 'Idaho' },
   { value: 'IL', label: 'Illinois' },
   { value: 'IN', label: 'Indiana' },
   { value: 'IA', label: 'Iowa' },
   { value: 'KS', label: 'Kansas' },
   { value: 'KY', label: 'Kentucky' },
   { value: 'LA', label: 'Louisiana' },
   { value: 'ME', label: 'Maine' },
   { value: 'MD', label: 'Maryland' },
   { value: 'MA', label: 'Massachusetts' },
   { value: 'MI', label: 'Michigan' },
   { value: 'MN', label: 'Minnesota' },
   { value: 'MS', label: 'Mississippi' },
   { value: 'MO', label: 'Missouri' },
   { value: 'MT', label: 'Montana' },
   { value: 'NE', label: 'Nebraska' },
   { value: 'NV', label: 'Nevada' },
   { value: 'NH', label: 'New Hampshire' },
   { value: 'NJ', label: 'New Jersey' },
   { value: 'NM', label: 'New Mexico' },
   { value: 'NY', label: 'New York' },
   { value: 'NC', label: 'North Carolina' },
   { value: 'ND', label: 'North Dakota' },
   { value: 'OH', label: 'Ohio' },
   { value: 'OK', label: 'Oklahoma' },
   { value: 'OR', label: 'Oregon' },
   { value: 'PA', label: 'Pennsylvania' },
   { value: 'RI', label: 'Rhode Island' }
]

function CartItem( )
{
   return (
      <div className="cart-item">
         <img src="https://images.unsplash.com/photo-1589989369979-8e1b5e1b5f1f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="Product" />
         <div className="cart-item-info">
            <h2>Product Name</h2>
            <h3>Price</h3>
            <h3>Quantity</h3>
         </div>
      </div>
   );
}

function Checkout( )
{
   return (
      <main id="checkout">
         <div id="checkout-cart">
            <h1>Shopping Cart</h1>
            <div id="cart-items">
               <CartItem />
            </div>

            <div id="cart-item-total">
               Number of items here
            </div>
         </div>

         <div id="user-details">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address" />
            <input type="tel" placeholder="Phone Number" />
            <input type="textarea" placeholder="Address Line 1" />
            <input type="text" placeholder="Address Line 2" />
            <input type="text" placeholder="City" />
            <select>
               {states.map( ( state ) =>
               (
                  <option value={state.value}>{state.label}</option>
               ))}
            </select>
         </div>
      </main>
   );
}

export default Checkout;
import React from 'react';
import './checkout.css';

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

function CartItem( props )
{
   return (
      <div className="cart-item">
         <img src={ props.image } alt={ props.name } />
         <div className="cart-item-info">
            <div className="cart-item-name-price">
               <h2>{ props.name }</h2>
               <p>{ "$" + props.price }</p>
            </div>
            <p className="cart-item-quantity">{ "Quantity: " + props.quantity }</p>
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
               <CartItem image={ "http://via.placeholder.com/200x200" } name={ "Temp" } price={ 50 } quantity={ 2 } />
               <CartItem image={ "http://via.placeholder.com/200x200" } name={ "Temp" } price={ 50 } quantity={ 2 } />
               <CartItem image={ "http://via.placeholder.com/200x200" } name={ "Temp" } price={ 50 } quantity={ 2 } />
            </div>

            <div id="cart-item-totals">
               <h3 id="cart-total-quantity">3 Items</h3>
               <h3 id="cart-total-price">{"$" + 87.69}</h3>
               <button id="checkout-button">Checkout</button>
            </div>
         </div>

         <div id="user-details">
            <input class="ecommerce-user-input" type="text" placeholder="First Name" />
            <input class="ecommerce-user-input" type="text" placeholder="Last Name" />
            <input class="ecommerce-user-input" type="email" placeholder="Email Address" />
            <input class="ecommerce-user-input" type="tel" placeholder="Phone Number" />
            <input class="ecommerce-user-input" type="textarea" placeholder="Address Line 1" />
            <input class="ecommerce-user-input" type="text" placeholder="Address Line 2" />
            <input class="ecommerce-user-input" type="text" placeholder="City" />
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
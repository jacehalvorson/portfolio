import React, { useState, useEffect } from 'react';
import { ReadJSONAndExecuteSetter } from '../utils/readJSON.js';
import './ecommerce.css'

// File names
const productsFileName = '/products.json';
const cartFileName = '/cart.json';

function ProductPreviews( )
{
   const [ productDict, setProductDict ] = useState( { } );

   useEffect( ( ) =>
   {
      console.log( 'Reading products from ' + productsFileName + ': ' );
      ReadJSONAndExecuteSetter( productsFileName, setProductDict );
   }, [ ] );

   if ( !productDict.products )
   {
      return ( <div></div> );
   }
   return (
      <ul>
      {
         productDict.products.map( product => 
         (
            <a href={ '/ecommerce/product/' + product.id }>
               <li
                  className="product-preview"
                  style={{ backgroundImage: 'url( ' + product.image + ')' }}
               >
               <div className="product-details">
                  <h3 className="product-title">{ product.name }</h3>
                  <h3 className="product-price">{ '$' + product.price }</h3>
                  <p className="product-description">{ product.description }</p>
               </div>
               </li>
            </a>
         ))
      }
      </ul>
   );
}

function Ecommerce( )
{
   return (
      <main id="ecommerce">
         <div className="product-list">
            <ProductPreviews />
         </div>
      </main>
   );
}

export default Ecommerce;
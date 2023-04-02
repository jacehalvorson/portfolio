import React, { useState, useEffect } from 'react';
import './Ecommerce.css'

function ProductPreviews( )
{
   const [ productList, setProductList ] = useState( [ ] );

   useEffect( ( ) =>
   {
      fetch( '/products.json' )
         .then( response => response.json( ) )
         .then( json => setProductList( json.products ) )
         .catch( err => console.error( err ) )
   }, [ ] );

   return (
      <ul>
      {
         productList.map( product => 
         (
            <li
               className="product-preview"
               onClick= { ( ) => window.open( 'product/' + product.id ) }
               style={{ backgroundImage: 'url( ' + product.image + ')' }}
            >
            <div className="product-details">
               <h3 className="product-title">{ product.name }</h3>
               <h3 className="product-price">{ '$' + product.price }</h3>
               <p className="product-description">{ product.description }</p>
            </div>
            </li>
         ))
      }
      </ul>
   );
}

function Ecommerce( )
{
   return (
      <main>
         <div className="product-list">
            <ProductPreviews />
         </div>
      </main>
   );
}

export default Ecommerce;
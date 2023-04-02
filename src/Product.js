import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Product.css";

function Product( )
{
   // Get the product ID from the URL
   const { productId: id } = useParams( );

   // Get the product data from the JSON file
   const [ product, setProduct ] = useState( { } );

   useEffect( ( ) =>
   {
      fetch( '/products.json' )
         .then( response => response.json( ) )
         .then( json => setProduct( json.products.find( product => product.id === id ) ) )
         .catch( err => console.error( err ) )
   }, [ ] );

   if ( !product )
   {
      return null;
   }

   return (
      <main>
         <article className="product">
            <div id="image-container">
               <img src={ product.image } alt={ product.name } />
               <i className="fa-solid fa-circle-chevron-left left-right-icons" id="left-icon"></i>
               <i className="fa-solid fa-circle-chevron-right left-right-icons" id="right-icon"></i>
            </div>
            <div id="title-price-container">
               <h1 id="product-name">{ product.name }</h1>
               <h2 className="price">{ '$' + product.price }</h2>
            </div>
            <p id="product-description">{ product.description }</p>
            <button id="add-to-cart" onClick={ ( ) => console.log( "Add to cart" ) }>Add to Cart</button>
         </article>
      </main>
   )
}

export default Product
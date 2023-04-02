import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReadJSONAndExecuteSetter from "./utils";
import productFileName from "./Ecommerce.jsx";
import "./Product.css";

function Product( )
{
   // Get the product ID from the URL
   const { productId: id } = useParams( );

   // Get the product data from the JSON file
   const [ productsObject, setProductsObject ] = useState( { } );
   useEffect( ( ) =>
   {
      ReadJSONAndExecuteSetter( productFileName, setProductsObject )
   }, [ ] );

   // Find the product with the given ID
   let productObject = productsObject.products.find( product => product.id === id );

   if ( !productObject )
   {
      // No product with this ID exists
      return ( <h1>404: Not Found</h1> );
   }

   return (
      <main>
         <article className="product">
            <div id="image-container">
               <img src={ productObject.image } alt={ productObject.name } />
               <i className="fa-solid fa-circle-chevron-left left-right-icons" id="left-icon"></i>
               <i className="fa-solid fa-circle-chevron-right left-right-icons" id="right-icon"></i>
            </div>
            <div id="title-price-container">
               <h1 id="product-name">{ productObject.name }</h1>
               <h2 className="price">{ '$' + productObject.price }</h2>
            </div>
            <p id="product-description">{ productObject.description }</p>
            <button id="add-to-cart" onClick={ ( ) => console.log( "Add to cart" ) }>Add to Cart</button>
         </article>
      </main>
   )
}

export default Product
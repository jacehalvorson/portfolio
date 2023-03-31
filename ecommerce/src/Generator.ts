// import * as fs from 'fs';

interface Product {
   name: string;
   price: number;
   description: string;
   numberOfImages: number;
   images: string[];
}

class Generator {
   private template : HTMLDocument;

   public constructor( templateFileName : string )
   {
      var htmlString : string = '';
      fetch( templateFileName )
         .then( response => response.text() )
         .then( text => console.log( text sup) )
         .catch( error => console.log( error ) );

      if ( !htmlString || htmlString.length === 0 )
      {
         throw new Error( 'Template file not found' );
      }

      var parser : DOMParser = new DOMParser( );
      var htmlObject : HTMLDocument = parser.parseFromString( htmlString, 'text/html' );
      console.log( htmlObject );
      console.log( htmlObject instanceof HTMLDocument );
      console.log( htmlObject instanceof Document );

      this.template = htmlObject;
   }

   public generateProductPage( product: Product ): HTMLDocument
   {
      var HTMLObject : HTMLDocument = this.template.cloneNode( true ) as HTMLDocument;
      if ( HTMLObject == null )
      {
         throw new Error( 'Template file not found' );
      }
      // Change HTMLObject's title and product name to product.title
      var title : HTMLTitleElement | null = HTMLObject.querySelector( 'title' );
      if ( title != null )
      {
         title.textContent = product.name;
      }

      var productName : HTMLHeadElement | null = HTMLObject.querySelector( '#product-name' );
      if ( productName != null )
      {
         productName.textContent = product.name;
      }

      // Change HTMLObject's price to product.price
      var productPrice : HTMLHeadElement | null = HTMLObject.querySelector( '#product-price' );
      if ( productPrice != null )
      {
         productPrice.textContent = '$' + product.price;
      }

      // Change HTMLObject's description to product.description
      var productDescription : HTMLHeadElement | null = HTMLObject.querySelector( '#product-description' );
      if ( productDescription != null )
      {
         productDescription.textContent = product.description;
      }

      // Change HTMLObject's images to product.images
      if ( product.images.length > 0 )
      {
         var productImage : HTMLImageElement | null = HTMLObject.querySelector( '#image-container img' );
         if ( productImage != null )
         {
            productImage.src = product.images[0];
            productImage.alt = product.name;
         }
      }
      else
      {
         throw new Error( `No images supplied for product ${product.name}` );
      }

      // TODO Change HTMLObject's number of images to product.numberOfImages

      // Return HTMLObject
      return HTMLObject;
   }
}

const product: Product = {
   name: 'Product Name',
   price: 100,
   description: 'Product Description',
   images: [
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
   ],
   numberOfImages: 1
};

const generator : Generator = new Generator( './template.html' );
const htmlObject : HTMLDocument = generator.generateProductPage( product );
console.log( htmlObject );
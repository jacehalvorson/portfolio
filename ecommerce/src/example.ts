import { Generator, Product } from './Generator';

const product: Product = {
   name: 'Product Name',
   price: 100,
   description: 'Product Description',
   images: [
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
   ],
   numberOfImages: 1
};

const generator : Generator = new Generator( './product/template.html' );
const htmlObject : HTMLDocument = generator.generateProductPage( product );
console.log( htmlObject );


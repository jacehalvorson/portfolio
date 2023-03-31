"use strict";
exports.__esModule = true;
var Generator_1 = require("./Generator");
var product = {
    name: 'Product Name',
    price: 100,
    description: 'Product Description',
    images: [
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    ],
    numberOfImages: 1
};
var generator = new Generator_1.Generator('./product/template.html');
var htmlObject = generator.generateProductPage(product);
console.log(htmlObject);

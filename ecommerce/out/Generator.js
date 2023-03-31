// import * as fs from 'fs';
var Generator = /** @class */ (function () {
    function Generator(templateFileName) {
        var htmlString = '';
        fetch(templateFileName)
            .then(function (response) { return response.text(); })
            .then(function (text) { return console.log(text, sup); })["catch"](function (error) { return console.log(error); });
        if (!htmlString || htmlString.length === 0) {
            throw new Error('Template file not found');
        }
        var parser = new DOMParser();
        var htmlObject = parser.parseFromString(htmlString, 'text/html');
        console.log(htmlObject);
        console.log(htmlObject instanceof HTMLDocument);
        console.log(htmlObject instanceof Document);
        this.template = htmlObject;
    }
    Generator.prototype.generateProductPage = function (product) {
        var HTMLObject = this.template.cloneNode(true);
        if (HTMLObject == null) {
            throw new Error('Template file not found');
        }
        // Change HTMLObject's title and product name to product.title
        var title = HTMLObject.querySelector('title');
        if (title != null) {
            title.textContent = product.name;
        }
        var productName = HTMLObject.querySelector('#product-name');
        if (productName != null) {
            productName.textContent = product.name;
        }
        // Change HTMLObject's price to product.price
        var productPrice = HTMLObject.querySelector('#product-price');
        if (productPrice != null) {
            productPrice.textContent = '$' + product.price;
        }
        // Change HTMLObject's description to product.description
        var productDescription = HTMLObject.querySelector('#product-description');
        if (productDescription != null) {
            productDescription.textContent = product.description;
        }
        // Change HTMLObject's images to product.images
        if (product.images.length > 0) {
            var productImage = HTMLObject.querySelector('#image-container img');
            if (productImage != null) {
                productImage.src = product.images[0];
                productImage.alt = product.name;
            }
        }
        else {
            throw new Error("No images supplied for product " + product.name);
        }
        // TODO Change HTMLObject's number of images to product.numberOfImages
        // Return HTMLObject
        return HTMLObject;
    };
    return Generator;
}());
var product = {
    name: 'Product Name',
    price: 100,
    description: 'Product Description',
    images: [
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    ],
    numberOfImages: 1
};
var generator = new Generator('./template.html');
var htmlObject = generator.generateProductPage(product);
console.log(htmlObject);

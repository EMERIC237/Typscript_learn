import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Product } from "./product.models";
import { validate } from "class-validator";

const products = [
  { title: "a carpet", price: 29.99 },
  { title: "a cart", price: 19.99 },
];

const p1 = new Product("A BOOK", 13.59);
const newProd = new Product("", -4.56);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("validation errors!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

console.log(p1.getInformation());
const loadedProducts = plainToClass(Product, products);

loadedProducts.forEach((prod) => {
  console.log(prod.getInformation());
});

import { PrismaClient, Product, Ingredient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { randomIntFromInterval } from '../src/common';

const prisma = new PrismaClient();

async function main() {
  const amountOfProducts = 50;
  const amountOfIngredients = 100;

  const productNames = [];

  const products: Product[] = [];
  const ingredients: Ingredient[] = [];

  for (let i = 0; i < amountOfProducts; i++) {
    let productName = faker.commerce.productName();
    while (productNames.some((value) => value === productName)) {
      productName = faker.commerce.productName();
    }

    productNames.push(productName);

    const product: Product = {
      id: i + 1,
      name: productName,
      manufacturer: faker.word.noun().toUpperCase(),
      price: Number(faker.finance.amount({ min: 3, max: 100 })),
      image: faker.image.url({ width: 74, height: 74 }),
      UPC: String(faker.number.bigInt()),
      NPN: String(faker.number.bigInt()),
      DIN: String(faker.number.bigInt()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(product);
  }

  for (let i = 0; i < amountOfIngredients; i++) {
    const ingredient: Ingredient = {
      id: i + 1,
      productId: randomIntFromInterval(1, amountOfProducts),
      name: faker.commerce.productMaterial(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    ingredients.push(ingredient);
  }

  const addProducts = async () =>
    await prisma.product.createMany({ data: products });

  const addIngredients = async () =>
    await prisma.ingredient.createMany({ data: ingredients });

  await addProducts();
  await addIngredients();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { test, expect } from '@playwright/test';

// Suite
test.describe('Automation Exercise Website Test Suite', () => {
  // Abrir pagina
  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
  });

  // Agrgar producto a carrito
  test('add product to cart and verify', async ({ page }) => {
    // Verificar seccion de productos recomendados
    const recommendedItemsHeading = page.getByRole('heading', { name: 'recommended items' });
    await expect(recommendedItemsHeading).toBeVisible();
    await recommendedItemsHeading.click();
    
    // Agregar producto al carrito
    const addToCartButton = page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn').first();
    await addToCartButton.click();
    
    // Verificar y hacer click en View Cart
    const viewCartLink = page.getByRole('link', { name: 'View Cart' });
    await expect(viewCartLink).toBeVisible();
    await viewCartLink.click();
    
    // Verificar nombre del producto
    const productLink = page.getByRole('link', { name: 'Stylish Dress' });
    await expect(productLink).toBeVisible();
  });

  //  Agregar review
  test('add product review and verify', async ({ page }) => {
    // Navegar a la pagina de productos
    const productsLink = page.getByRole('link', { name: ' Products' });
    await expect(productsLink).toBeVisible();
    await productsLink.click();
    
    // Verificar encabezado de todos los productos
    const allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    await expect(allProductsHeading).toBeVisible();
    await allProductsHeading.click();
    
    // Hacer click en view product link (4th product)
    const viewProductLink = page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a');
    await viewProductLink.click();
    
    // Hacer click en Write Your Review link
    const writeReviewLink = page.getByRole('link', { name: 'Write Your Review' });
    await expect(writeReviewLink).toBeVisible();
    await writeReviewLink.click();
    
    // Llenar review form - Name
    const nameInput = page.getByRole('textbox', { name: 'Your Name' });
    await expect(nameInput).toBeVisible();
    await nameInput.click();
    await nameInput.fill('juan');
    
    // Hacer click en el formulario para continuar (como en el test grabado)
    await page.getByText('Thank you for your review. Submit').click();
    
    // Llenar review form - Email
    const emailInput = page.getByRole('textbox', { name: 'Email Address', exact: true });
    await expect(emailInput).toBeVisible();
    await emailInput.click();
    await emailInput.fill('juan@gmail.com');
    
    // Llenar review form - Review text
    const reviewTextarea = page.getByRole('textbox', { name: 'Add Review Here!' });
    await expect(reviewTextarea).toBeVisible();
    await reviewTextarea.click();
    await reviewTextarea.fill('buen producto');
    
    // Hacer submit del review
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // Verificar mensaje de exito
    const successMessage = page.getByText('Thank you for your review.');
    await expect(successMessage).toBeVisible();
    await successMessage.click();
  });
});

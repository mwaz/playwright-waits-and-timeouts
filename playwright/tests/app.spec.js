// tests/app.spec.js

const { test, expect } = require("@playwright/test");

// Base URL for the running React application.
// Before running tests, ensure the React app is started (e.g., `npm start`).
const APP_URL = "http://localhost:3000";

// Test suite for the entire application.
test.describe("React Test App", () => {
  // Test for the login functionality, demonstrating waiting for an element to be enabled.
  test("should handle login form interaction correctly", async ({ page }) => {
    // 1. Navigate to the app.
    await page.goto(APP_URL);

    // 2. Navigate to the login page within the app.
    await page.getByRole("button", { name: "Login" }).click();

    // 3. Assert that the "Log In" button is initially disabled.
    // Playwright's `toBeDisabled` assertion handles this check gracefully.
    const loginButton = page.getByRole("button", { name: "Log In" });
    await expect(loginButton).toBeDisabled();

    // 4. Fill in the form fields.
    await page.getByLabel("Username").fill("testuser");
    await page.getByLabel("Password").fill("password123");

    // 5. Assert that the button is now enabled.
    // `toBeEnabled` is a web-first assertion that will wait and retry
    // until the element is no longer disabled.
    await loginButton.waitFor({ state: "visible", timeout: 5000 });

    // 6. Click the login button and assert navigation to the dashboard.
    await loginButton.click();
    await expect(
      page.getByRole("heading", { name: "Welcome, Test User" })
    ).toBeVisible();
  });

  test("should wait for the navigation load state before showing products", async ({
    page,
  }) => {
    // 1. Navigate to the app.
    await page.goto(`${APP_URL}/dashboard`);

    // 2. Go to the products page.
    await page.getByRole("button", { name: "Products" }).click();

    await page.waitForURL("**/dashboard");

    // 3. Click the button to load products.
    await page.getByRole("button", { name: "Load Products" }).click();

    // 4. Wait for the loading spinner to be hidden.
    // This is a crucial wait pattern for dynamic content. The test will pause
    // here until the loader is gone, indicating the data has loaded.
    const loader = page.locator("#loading-spinner");
    await expect(loader).toBeHidden({ timeout: 5000 }); // Wait up to 5s.

    // 5. Assert that the product list is now visible.
    const productList = page.locator(".product-item");
    await expect(productList).toHaveCount(3);
    await expect(productList.first()).toHaveText("Laptop");

    // Navigate to the products page and wait for the page resources to load.
    await page.goto(`${APP_URL}/products`);
    await page.waitForLoadState("load");
  });

  test("should wait for timeout - ONLY FOR DEBUGGING PURPOSES", async ({
    page,
  }) => {
    // 1. Navigate to the app.
    await page.goto(`${APP_URL}/dashboard`);

    // 2. Go to the products page.
    await page.getByRole("button", { name: "Products" }).click();

    await page.waitForURL("**/dashboard");

    // 3. Click the button to load products.
    await page.getByRole("button", { name: "Load Products" }).click();

    // 4. Wait for the loading spinner to be hidden.
    // This is a crucial wait pattern for dynamic content. The test will pause
    // here until the loader is gone, indicating the data has loaded.
    const loader = page.locator("#loading-spinner");
    await page.waitForTimeout(3000); // THIS IS ONLY MEANT FOR DEBUGGING PURPOSES AND SHOULD NOT BE USED IN PRODUCTION TESTS
    await expect(loader).toBeHidden({ timeout: 5000 }); // Wait up to 5s.
  });

  // Test for the modal dialog, demonstrating waiting for an element to become visible.
  test("should show the terms and conditions modal", async ({ page }) => {
    // 1. Navigate to the app's home page.
    await page.goto(APP_URL);

    // 2. Click the button to show the modal.
    await page.getByRole("button", { name: "Show Terms" }).click();

    // 3. Wait for the modal to become visible and assert its content.
    // `toBeVisible` automatically waits for the element to appear in the DOM
    // and be visible, which is perfect for elements that appear after a delay.
    const modalHeader = page.getByRole("heading", {
      name: "Terms and Conditions",
    });
    await expect(modalHeader).toBeVisible();

    // 4. Close the modal and assert that it is now hidden.
    await page.getByRole("button", { name: "Close" }).click();
    await expect(modalHeader).toBeHidden();
  });

  // Test for the cart counter, demonstrating waiting for text content to update.
  test("should wait for a state update on item addition", async ({ page }) => {
    // 1. Navigate to the app's home page.
    await page.goto(APP_URL);

    const cartBadge = page.locator(".cart-badge");

    // 2. Assert the initial state of the cart.
    // `toHaveText` is also a web-first assertion that will retry.
    await expect(cartBadge).toHaveText("Cart (0 items)");

    // 3. Click the "Add to Cart" button.
    const addButton = page.getByRole("button", { name: "Add to Cart" });
    await addButton.click();

    // 4. Assert the cart count has updated to 1.
    await expect(cartBadge).toHaveText("Cart (1 items)");

    // 5. Click "Add to Cart" again.
    await addButton.click();

    // Assert final state of the cart after two additions.
    await page.waitForFunction(() => {
      const cartCounter = document.querySelector(".cart-badge");
      return cartCounter && cartCounter.innerText.includes("2 items");
    });

    // 6. Click the "Remove from Cart" button.
    const removeButton = page.getByRole("button", { name: "Remove from Cart" });
    await removeButton.click();

    // 7. Assert the cart count has updated back to 1.
    await expect(cartBadge).toHaveText("Cart (1 items)");
  });
});

---
sidebar_position: 1
---

# Checkout - Introduction

The first step is to create a **Secure Checkout Page** hosted by Paybae. The payment flow will be as follows:

- You hit our **Create a checkout page** endpoint with any API client
- The body of the `POST` request should be a properly formatted JSON
- The response will be a JSON object with a `redirectUrl` property
- You can redirect the users to the `redirectUrl` to proceed with the payment flow

## Create a Hosted Checkout Page

### URL Endpoint

This is the first step.
You will need to hit this URL as a `POST` request

`https://gi46gicwmhxvqz5nztipbf4xny0bejop.lambda-url.us-east-1.on.aws/`:

### Request Headers

Only `application/json` Content-Type is supported.

For _authorization_, you will need to pass the `apikey` header with the your API token.

    apikey: <your api key>

### Request Body

The body of post request should be a JSON object with an `argument` object that has the following properties:

1. `vendorId`: The ID of the vendor e.g.: `71dc1710-d3e6-4fee-ac31-97de899ce958`.

   This is exposed in the `/developers` section in the **[Paybae dashboard](paybae-dashboard.vercel.app/developers)**.

2. `metadata`: A JSON stringified object that contains any metadata you want to associate with the checkout page. This metadata will be returned to you in case of a successful payment.

3. `successUrl`: The URL to redirect to after a successful payment.This URL will come with a `checkoutId` query parameter for you to validate the payment.

   e.g.: `https://paybae-demo-store.vercel.app/success`

4. `failureUrl`: The URL to redirect to after a failed payment.

   e.g.: `https://paybae-demo-store.vercel.app/failure`

5. `products`: A JSON stringified array of objects that contains the products you want to sell.

   e.g.:

   ```
   [{"name": "Product 1", "price": "10.00", "quantity": 1},
   {"name": "Product 2", "price": "20.00", "quantity": 2}]
   ```

   The available properties are:

   1. `name`: The name of the product.
   2. `price`: The price of the product.
   3. `quantity`: The quantity of the product.
   4. `description`: The description of the product.
   5. `image`: The URL of the product image.

### Demo Reuqest

```jsx title="demo-request.js"
const url = `https://gi46gicwmhxvqz5nztipbf4xny0bejop.lambda-url.us-east-1.on.aws`

const variables = {
  arguments: {
    vendorId: '71dc1710-d3e6-4fee-ac31-97de899ce958',
    metadata: JSON.stringify(
      cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.count,
      }))
    ),
    successUrl: `https://paybae-demo-store.vercel.app/success`,
    failureUrl: `https://paybae-demo-store.vercel.app/failure`,
    products: JSON.stringify([
      {
        id: '1',
        name: 'Product 1',
        price: '10.00',
        quantity: 1,
        description: 'Product 1 description',
        image: 'https://paybae-demo-store.vercel.app/product-1.jpg',
      },
      {
        id: '2',
        name: 'Product 2',
        price: '20.00',
        quantity: 2,
        description: 'Product 2 description',
        image: 'https://paybae-demo-store.vercel.app/product-2.jpg',
      },
    ]),
  },
}

const headers = {
  apikey: 'pk_dev_26026b43-541a-4a08-9188-c806c26b3876',
}

try {
  const { data } = await axios({
    method: 'POST',
    url,
    data: JSON.stringify(variables),
    headers,
  })

  if (data.statusCode === 200) {
    // * wait 2 seconds before redirecting to the payment endpoint
    setTimeout(() => {
      window.location.href = data.body.redirectUrl
    }, 2000)
  }
} catch (err) {
  console.log(err)
}
```

A new hosted checkout page is now available at `data.body.redirectUrl` for your customer.

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at `http://localhost:3000/my-markdown-page`.

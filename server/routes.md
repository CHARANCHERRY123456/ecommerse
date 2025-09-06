# API Routes Documentation

Base URL: `http://localhost:3000/api`

---

## Auth Routes

### POST /auth/signup
- **Input (JSON):** `{ name, email, password }`
- **Output (201):** `{ message: "User created", token, user: { id, name, email } }`
- **Errors:** 400 with `{ message: "Missing fields" | "Email already registered" }`

### POST /auth/login
- **Input (JSON):** `{ email, password }`
- **Output (200):** `{ message: "Login successful", token, user: { id, name, email } }`
- **Errors:** 400/401 with `{ message: "Missing fields" | "No User found" | "Password does not matched" }`

---

## Item Routes

### GET /items
- **Input (Query):** `category`, `minPrice`, `maxPrice` (optional)
- **Output (200):** `{ items: [...] }`

### GET /items/:id
- **Input (URL param):** `id`
- **Output (200):** `{ item }`
- **Errors:** 404 with `{ message: "Item not found" }`

### POST /items
- **Headers:** `Authorization: Bearer <token>`
- **Input (JSON):** Item fields
- **Output (201):** `{ message: "Item created", item }`
- **Errors:** 400 with `{ message }`

### PUT /items/:id
- **Headers:** `Authorization: Bearer <token>`
- **Input (JSON):** Item fields
- **Output (200):** `{ item }`
- **Errors:** 404 with `{ message: "Item not found" }`

### DELETE /items/:id
- **Headers:** `Authorization: Bearer <token>`
- **Output (200):** `{ item }`
- **Errors:** 404 with `{ message: "Item not found" }`

---

## Cart Routes

### POST /cart/add
- **Headers:** `Authorization: Bearer <token>`
- **Input (JSON):** `{ itemId, quantity }`
- **Output (200):** `{ message: "Item added to cart", cart }`
- **Errors:** 400 with `{ message }`

### POST /cart/remove
- **Headers:** `Authorization: Bearer <token>`
- **Input (JSON):** `{ itemId }`
- **Output (200):** `{ message: "Item removed from cart", cart }`
- **Errors:** 400 with `{ message }`

### GET /cart
- **Headers:** `Authorization: Bearer <token>`
- **Output (200):** `{ cart }`
- **Errors:** 400 with `{ message }`

---

## Notes
- All protected routes require a valid JWT token in the `Authorization` header.
- All responses are JSON.
- Port: 3000

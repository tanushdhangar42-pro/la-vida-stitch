# How to explain this project (viva guide)

## 1. The idea in two lines
La Vida Stitch sells T-shirts with a velcro panel on the chest. Customers choose detachable patches (designs and quotes), so one shirt gives many looks. The website lets them browse, customize, add to bag and order.

## 2. The big picture

```
Browser (React)  --HTTP/JSON-->  Spring Boot REST API  --JPA/Hibernate-->  MySQL
   port 5173/3000                      port 8080                           port 3306
```

1. The user clicks something in React.
2. `services/api.js` sends a request, for example `POST /api/orders`.
3. Spring Security checks the JWT token in the `Authorization` header.
4. A **controller** receives the request, a **service** applies the rules, a **repository** talks to MySQL.
5. JSON comes back and React updates the screen.

This is the MVC idea: **Model** = entities, **View** = React pages, **Controller** = Spring controllers.

## 3. Frontend, file by file

| File | What to say |
|---|---|
| `main.jsx` | Starts React and wraps the app in providers (shared data). |
| `App.jsx` | The map of URLs to pages using React Router. |
| `pages/` | One component per page: Home, Shop, ProductDetail, Customize, Cart, Checkout, Login, Admin and others. |
| `components/` | Pieces reused on many pages: Navbar, Footer, ProductCard, PatchCard, TShirtPreview. |
| `context/AuthContext` | Who is logged in. Saves the JWT in localStorage. |
| `context/CatalogContext` | Loads products, patches and fabrics from the API once. |
| `context/CartContext` | The cart: add, remove, quantity, subtotal, shipping rule. |
| `context/CustomizationContext` | The colour, fabric, size and patches chosen in the customizer. |
| `services/api.js` | The only file that calls the backend. One function per endpoint. |

Key React ideas used: components, props, `useState`, `useEffect`, `useMemo`, Context API, React Router, controlled forms.

**Customizer:** `TShirtPreview` shows a real tee photo for the chosen colour. Patches are placed on top with absolute positioning. Dragging uses the HTML5 drag and drop events (`onDragStart`, `onDrop`) and stores the drop position as a percentage.

## 4. Backend, layer by layer

| Layer | Example | Job |
|---|---|---|
| Model (entity) | `Product`, `Order`, `User` | Each class becomes a MySQL table. |
| Repository | `ProductRepository` | Gives save, find and delete without writing SQL. |
| Service | `OrderService`, `AuthService` | Business rules: totals, shipping, password check. |
| Controller | `OrderController` | Receives HTTP requests and returns JSON. |
| DTO | `OrderRequest` | Shape of incoming data, with validation rules. |
| Security | `JwtService`, `JwtAuthFilter`, `SecurityConfig` | Token creation, token checking, who may use which URL. |
| DataLoader | `DataLoader` | Fills the tables with products on first start. |

## 5. How login works (JWT)

1. User sends email and password to `/api/auth/login`.
2. The server finds the user and compares the password with the **BCrypt hash** stored in MySQL.
3. If correct, the server creates a **JWT** containing the email and role, signed with a secret key.
4. React stores the token and sends it as `Authorization: Bearer <token>` on every request.
5. `JwtAuthFilter` verifies the signature and expiry before each request.
6. `SecurityConfig` decides: products are public, orders need login, `/api/admin/**` needs the ADMIN role.

## 6. Order flow
Cart (React state) → Checkout form with validation → `POST /api/orders` → `OrderService` recalculates subtotal, shipping (free at 999 rupees or more, otherwise 79) and the cash-on-delivery fee → order and items saved in MySQL → order code returned (for example LVS482915).

Payment is simulated: no real money moves and no card data is sent.

## 7. Docker
`docker-compose.yml` starts three containers: MySQL, the Spring Boot jar, and nginx serving the built React files. nginx forwards `/api` to the backend, so the browser only talks to one address.

## 8. Mapping to the syllabus

| Syllabus experiment | Where it is in the project |
|---|---|
| Setup Java, Spring Boot, React | `backend/pom.xml`, `frontend/package.json` |
| Static page with HTML, CSS, Bootstrap | About, How It Works, Contact pages (CSS with Tailwind) |
| Dynamic front-end with API calls | `services/api.js`, `CatalogContext` |
| RESTful web service | `controller/` package |
| MySQL with Spring Boot | `model/`, `repository/`, `application.properties` |
| JWT authentication | `security/`, `AuthService`, `SecurityConfig` |
| Connect React with Spring Boot | `api.js` plus Vite proxy and nginx proxy |
| Docker and GitHub | `Dockerfile`s, `docker-compose.yml` |

## 9. Questions examiners may ask

- **Why React Context and not Redux?** The app is small; Context is built in and enough.
- **Why DTOs?** To validate input and not expose database entities directly.
- **Why BCrypt?** It is a slow one-way hash, so stolen databases do not reveal passwords.
- **Why is the token stateless?** The server does not store sessions; everything needed is in the signed token.
- **What would you improve?** The server should re-check item prices against the database, add a real payment gateway (Razorpay), order status updates, and stock management.

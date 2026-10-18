# La Vida Stitch

A full-stack e-commerce website for a T-shirt brand where one shirt has many looks: customers swap detachable velcro **patches** on a chest panel.

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router, Tailwind CSS, Vite |
| Backend | Spring Boot 3 (Java 17), REST API |
| Database | MySQL 8 with JPA / Hibernate |
| Security | JWT login, BCrypt passwords, roles USER and ADMIN |
| Deployment | Docker and Docker Compose |
| API testing | Postman (collection included) |

## Run option 1: Docker (easiest, one command)

Install Docker Desktop, then in this folder run:

```
docker compose up --build
```

- Website: http://localhost:3000
- API: http://localhost:8080/api/products

## Run option 2: without Docker (for development)

You need JDK 17+, Maven, MySQL 8 and Node.js 18+.

1. Start MySQL. The default login in `backend/src/main/resources/application.properties` is user `root`, password `root`. The database `lavida_stitch` is created automatically.
2. Start the backend:
   ```
   cd backend
   mvn spring-boot:run
   ```
   On the first start it creates the tables and fills in the 12 products, 12 patches and 4 fabrics.
3. Start the frontend (new terminal):
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Open http://localhost:5173. The Vite server forwards `/api` requests to port 8080.

## Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@lavidastitch.com | Admin@123 |
| Customer | create one on the Account page | min. 6 characters |

The admin account sees an **Admin** page (`/admin`) with all orders and contact messages.

## Features

- Browse, filter and sort products. Product page with colours, fabrics, sizes and patches.
- Patch library with flip-to-see-the-back cards.
- **Customizer:** pick a colour, fabric and size, then drag patches onto a real tee photo.
- Search, cart with quantity control, free shipping above 999 rupees, checkout with validation.
- Register and login with JWT. Orders are saved in MySQL. "Your orders" list on the Account page.
- Contact form saved in MySQL. Admin page for orders and messages.

## Folder structure

```
la-vida-stitch/
├── docker-compose.yml          starts MySQL + backend + frontend
├── LaVidaStitch.postman_collection.json
├── frontend/                   React app
│   └── src/
│       ├── main.jsx            starts the app and adds the providers
│       ├── App.jsx             list of pages (routes)
│       ├── pages/              one file per page
│       ├── components/         reusable parts (Navbar, ProductCard ...)
│       ├── context/            shared state: login, catalogue, cart, customizer
│       ├── services/api.js     every call to the backend
│       ├── data/constants.js   fixed values (colours, categories)
│       └── assets/             images
└── backend/                    Spring Boot API
    └── src/main/java/com/lavidastitch/
        ├── controller/         REST endpoints
        ├── service/            business logic
        ├── repository/         database access (JPA)
        ├── model/              database tables (entities)
        ├── dto/                shapes of request and response bodies
        ├── security/           JWT creation and checking
        ├── config/             security rules and start-up data
        └── exception/          error messages
```

## REST API

| Method | URL | Who can use it |
|---|---|---|
| POST | /api/auth/register | everyone |
| POST | /api/auth/login | everyone |
| GET | /api/products, /api/products/{id} | everyone |
| GET | /api/patches, /api/fabrics | everyone |
| POST | /api/customizations | everyone |
| POST | /api/contact | everyone |
| POST | /api/orders | logged-in users |
| GET | /api/orders/my | logged-in users |
| GET | /api/admin/orders, /api/admin/messages | ADMIN only |

Import `LaVidaStitch.postman_collection.json` into Postman to test them. Run a Login request first; the token is saved automatically.

## Database tables

`users`, `products` (+ `product_gallery`, `product_colors`, `product_sizes`), `patches`, `fabrics`, `orders`, `order_items`, `customizations`, `contact_messages`.

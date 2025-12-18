
  # Campus Eats

  This is a code bundle for Campus Eats. The original project is available at https://www.figma.com/design/4y5nPuOodRoNLUjPHKo7Tx/Campus-Eats.

  ## Project Structure

  This project consists of two parts:
  - **Frontend**: React/TypeScript application with Vite
  - **Backend**: Node.js/Express REST API with file-based storage

  ## Setup and Installation

  ### Prerequisites
  - Node.js (v18 or higher)
  - npm

  ### Backend Setup

  1. Navigate to the backend directory:
  ```bash
  cd backend
  ```

  2. Install dependencies:
  ```bash
  npm install
  ```

  3. Start the backend server:
  ```bash
  npm start
  ```

  The backend API will be available at `http://localhost:3001`

  For development with auto-reload:
  ```bash
  npm run dev
  ```

  ### Frontend Setup

  1. Navigate to the root directory:
  ```bash
  cd ..
  ```

  2. Install dependencies:
  ```bash
  npm install
  ```

  3. Start the development server:
  ```bash
  npm run dev
  ```

  The frontend will be available at `http://localhost:3000`

  ## Running the Full Application

  To run both frontend and backend:

  1. **Terminal 1** - Start the backend:
  ```bash
  cd backend
  npm start
  ```

  2. **Terminal 2** - Start the frontend:
  ```bash
  npm run dev
  ```

  ## API Documentation

  ### Base URL
  ```
  http://localhost:3001/api
  ```

  ### Endpoints

  #### Restaurants
  - `GET /restaurants` - Get all restaurants
  - `GET /restaurants/:id` - Get restaurant by ID
  - `GET /restaurants/:id/menu` - Get restaurant menu

  #### Orders
  - `POST /orders` - Create new order
    ```json
    {
      "userId": "user1",
      "restaurantId": "1",
      "items": [
        {
          "id": "1",
          "name": "Burger",
          "price": 50,
          "quantity": 2
        }
      ],
      "total": 100
    }
    ```
  - `GET /orders/:id` - Get order by ID
  - `GET /orders/user/:userId/active` - Get active order for user
  - `PATCH /orders/:id/status` - Update order status
    ```json
    {
      "status": "preparing"
    }
    ```
    
    Valid statuses: `pending`, `preparing`, `ready`, `picked-up`, `delivering`, `delivered`

  #### Authentication
  - `POST /auth/login` - Simple authentication
    ```json
    {
      "email": "student@campus.edu"
    }
    ```
  - `GET /auth/users/:id` - Get user profile

  #### Health Check
  - `GET /health` - Check API health status

  ## Features

  ### Dynamic Order Status
  - Home screen only displays active order status when a user has an order in progress
  - Order progress is calculated based on order status:
    - Pending: 10%
    - Preparing: 40%
    - Ready: 65%
    - Picked up: 80%
    - Delivering: 90%
    - Delivered: 100%

  ### Mock Data
  The backend includes sample data for:
  - 4 restaurants (Proxy, L'Italien, Shawarma House, Salad Bar)
  - Menu items with prices and images
  - 2 test users (user1, user2)

  ## Environment Variables

  Create a `.env` file in the root directory:
  ```
  VITE_API_URL=http://localhost:3001
  ```

  ## Development Notes

  - Orders are stored in `backend/models/orders.json`
  - Restaurant data is in `backend/models/restaurants.json`
  - User data is in `backend/models/users.json`
  - CORS is configured to allow requests from `http://localhost:3000`
  
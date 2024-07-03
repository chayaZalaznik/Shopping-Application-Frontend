# Shopping Application Frontend

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Project Logic](#project-logic)
4. [Technology Stack](#technology-stack)
5. [Installation and Setup](#installation-and-setup)
6. [Usage](#usage)

## Introduction
Welcome to the Shopping Application! This project is a modern, user-friendly web application designed to provide a seamless shopping experience. Users can browse products, add them to their cart, manage orders, and more.

## Project Overview
The Shopping Application frontend is built using modern web technologies and includes the following main features:
- User Authentication and Authorization
- Product Browsing and Search
- Shopping Cart Management
- Order Management
- User Profile Management

## Project Logic
### User Authentication and Authorization
- **Registration:** New users can register by providing their details. The details are securely stored in the backend.
- **Login:** Registered users can log in using their credentials. Upon successful login, a JWT token is issued and stored in `localStorage`.
- **Logout:** Users can log out, which clears the JWT token from `localStorage` and the authentication context.

### Product Browsing and Search
- **Product Listing:** Products are fetched from the backend and displayed to users.
- **Search:** Users can search for products using a search bar. The search query is sent to the backend, which returns the matching products.

### Shopping Cart Management
- **Add to Cart:** Users can add products to their cart. The cart data is stored in the frontend state and can be persisted in `localStorage`.
- **View Cart:** Users can view the items in their cart. Each item displays its name, price, and quantity.
- **Update Cart:** Users can update the quantity of items in their cart or remove items from the cart.

### Order Management
- **Place Order:** Users can place an order for the items in their cart. The order details are sent to the backend and stored.
- **View Orders:** Users can view their past orders. Only closed orders are displayed to each user.

### User Profile Management
- **View Profile:** Users can view their profile details, including name, email, phone number, and address.
- **Delete Account:** Users can delete their account, which removes their data from the backend.

## Technology Stack
### Frontend
- **React:** A JavaScript library for building user interfaces.
- **React Router:** A library for routing in React applications.
- **React Bootstrap:** A library for using Bootstrap components in React.
- **Axios:** A promise-based HTTP client for making API calls.
- **FontAwesome:** A library for adding icons to the application.

## Installation and Setup
1. **Clone the Repository:**
    git clone https://github.com/chayaZalaznik/Shopping-Application-Frontend.git
    cd shopping-application
2. **Install Frontend Dependencies:**
    npm install
3. **Run the Frontend Application:**
    npm run dev

## Usage
- **Navigate to the Home Page:** After running the application, open a web browser and navigate to `http://localhost:5173/`.
- **Register and Login:** Use the registration and login forms to create a new account and log in.
- **Browse Products:** Browse the available products and use the search feature to find specific items.
- **Manage Cart:** Add products to your cart, update quantities, and remove items as needed.
- **Place Orders:** Review your cart and place an order for the items.
-**View Orders and Profile: Access your order history and update your profile information. There is also an option to delete your profile

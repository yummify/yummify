# Yummify

Yummify is an e-commerce app that addresses two critical issues: reducing food waste and saving money. By offering discounted "surprise bags," restaurants can sell their unsold or unused food to customers rather than discarding it. This not only helps reduce the amount of waste hauled but also recoups costs for the restaurant. Moreover, it demonstrates a commitment to sustainability and the environment, thereby earning customer trust and loyalty.

## Demo

[![Yummify Demo](https://img.youtube.com/vi/K3fjTKBAuxE/maxresdefault.jpg)](https://www.youtube.com/watch?v=K3fjTKBAuxE&t=31s)

## Features

- Map and List view of participating restaurants
- User/Restaurant/Admin Login, Account Creation, Authentication
- Designed for mobile-first view

This project was created with create-react-app, as a Capstone Project for the Grace Hopper Web Development Program at Fullstack Academy.

## Technologies Used

- React
- Redux
- React Router
- Node
- Firebase
- Cloud Firestore
- Cloud Storage (Firebase)
- Firebase Authorization
- Google Maps API
- Webpack
- Bootstrap
- JavaScript
- CSS
- HTML

## Collaborators

- Jacqueline Basanta: [Github](https://github.com/orgs/yummify/people/slightdevastation), [LinkedIn](https://www.linkedin.com/in/jacqueline-basanta/)
- Caroline Boyle: [Github](https://github.com/orgs/yummify/people/caroline-boyle), [LinkedIn](https://www.linkedin.com/in/caroline-boyle97/)
- Meg Bickerstaff: [Github](https://github.com/orgs/yummify/people/megtb), [LinkedIn](https://www.linkedin.com/in/meg-bickerstaff/)
- Monique Hayes: [Github](https://github.com/orgs/yummify/people/moniquehayes), [LinkedIn](https://www.linkedin.com/in/monique-hayes/)
- Manimala Sivasubramanian: [Github](https://github.com/orgs/yummify/people/msiva06), [LinkedIn](https://www.linkedin.com/in/manimalasiva/)

### Structure

SRC Folder: 

1. Components
    - each component has a folder. That folder contains the component's JS file and its slice.

2. Contexts
    - contains AuthContext.js

3. Firebase
    - config.js -> firebase setup
    - file for each component's methods

4. Store
    - compiles Redux slices


YUMMIFY
|
└───src
    │───components
    |    └── Admin 
    |    └── AllRestaurants
    |    └── App
    |    └── Auth
    |    └── Bag
    |    └── Cart
    |    └── Filter
    |    └── Footer
    |    └── Home
    |    └── Map
    |    └── NavBar
    |    └── Order
    |    └── Restaurant
    |    └── SingleRestaurant
    |    └── SplashPage
    |    └── ToggleView
    |    └── User
    |    └── Users
    │───contexts
    |    └── AuthContext.js
    │───firebase
    |    └── config.js
    |    └── getPlaces.js
    |    └── usersSeed.sj
    └───store
         └── index.js

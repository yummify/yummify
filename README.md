# Yummify

Full stack e-commerce app - allows users to reserve surprise bags of leftover food from local restaurants

## Features

- Map and List view of participating restaurants
- User/Restaurant/Admin Login, Account Creation, Authentication
- Designed for mobile view first

## Technologies Used

- React
- Redux
- React Router
- Node
- Firebase
- Firebase Authorization
- Webpack
- Bootstrap
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


### Database

Yummify uses Firebase (Firestore Database) from Google

Collections: 
    - Restaurants
    - Users
    - Bags
    - Orders



<!-- ### 3/17###
- commented auth out of firebase/config
- not accessing firebase correctly bc redux is empty -->




Issues: 
-learning firebase
-dotenv & react combination
-limit with DB calls in Firestore


STYLE NOTES: 
- fonts: 
    font-family: 'Amaranth', sans-serif;
    font-family: 'Arsenal', sans-serif;
    font-family: 'Karma', serif;
    font-family: 'PT Serif', serif;
    font-family: 'Shadows Into Light Two', cursive;

- colors: 
    background: white
    buttons: #8783d1
    primary borders: #41ead4
    secondary borders: #fbff12
    footer: #e5d4ce
    **pink in logo: #ff206e
# Post-Feed-React
## 1.	Project Overview:
- ### Purpose:
  Post Feed is a basic Web Application built with React that allows users to share their thoughts on the internet. The application includes user authentication for personalized experience.
## 2.	Key Features:
- ### User-Friendly Interface:
  The application boasts an intuitive and clean user interface, ensuring a seamless experience for users.
- ### Post Creation:
  Users can easily create and share their thoughts by posting messages on the platform, fostering a sense of community.
- ### Commenting System:
  The application enables users to engage in conversations by commenting on posts, promoting interaction and discussion.
- ### User Authentication:
  To enhance security and offer a personalized experience, the application implements user authentication. Users can register, log in, and access additional features, adding a layer of personalization to their interactions.
## 3. Project Structure:
- ### Directory Structure:
- /project-root
- /backend
    - /models
    - server.js
- /frontend
    - /src
    - /components
    - package.json
## 4. Dependencies:
### 1. Frontend Dependencies:
- Axios.
- React.
- React-Dom.
- React-Router.
- React-Router-Dom.
- React-Scripts.
- Styled-Components.
- Web-Vitals.
### 2. Backend Dependencies:
- Bcrypt.
- Body-Parser.
- Cors.
- Express.
- Express-Session.
- Jsonwebtoken.
- Mongoose.
- Passport.
- Passport-Local.
- Passport-Local-Mongoose.
## 5. Getting Started:
### 1. Prerequities:
- Node.js installed on your machine.
### 2. Installation:
- #### Frontend Setup:
- Clone the repository
  - git clone https://github.com/Onkar235/Post-Feed-React.git
- Navigate to the frontend directory
  - cd Post-Feed-React/frontend
- Install dependencies
  - npm install
- Start the frontend server
  - npm start
- #### Backend Setup:
- Navigate to the backend directory
  - cdPost-Feed-React/backend
- Install dependencies
  - npm install
- Start the backend server
  - node server.js

## API Endpoints:
- ### GET /api/posts:
  Get all posts.
  Parameters: None
  Response: Array of posts
- ### POST /api/posts:
  Create a new post.
  Parameters: {text: string}
  Response: Created post object
- ### POST /api/posts/:id/comments:
  Add a comment to a post.
  Parameters: {text: string}
  Response: Created comment object
### User Authentication Endpoints:
- ### POST /api/register:
  Register a new user.
  Parameters: {username: string, password: string}
  Response: {message: string} (User registered successfully)
- ### POST /api/login:
  Login user.
  Parameters: {username: string, password: string}
  Response: {token: string} (JWT token for authentication)
## 7. Authentication:
To access certain features, users need to register and log in. Use the provided user authentication endpoints to create an account and obtain an authentication token.
## 8. Frontend Components:
- Home.css.
- Home.js.
- Login.css.
- Login.js.
- Register.css.
- Register.js.
## 9. Conclusion:
The Post Feed Web Application offers a simple yet effective platform for users to share their thoughts and engage with others. With a user-friendly interface built using React, the application provides essential features such as post creation, commenting, and user authentication.
## 10. Next Steps and Future Improvements:
While the current version provides a solid foundation, there are opportunities for future enhancements, such as:
- Rich Media Support: Integrate support for images, videos, or other media types in posts to diversify content.
- User Profiles: Implement user profiles to allow users to showcase additional information about themselves.
- Enhanced Search Functionality: Improve the search feature to provide more accurate and relevant results, enhancing user experience.
- Real-Time Updates: Introduce real-time updates for posts and comments to keep users informed about the latest activities on the platform.

##
**Please note that this project is for educational and informational purposes only.**

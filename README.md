# Fact Generator

Fact Generator is a web application that allows you to discover interesting facts. Users can view random facts, see the fact of the day, and save their favorite facts for later viewing. The application also supports English and German languages.

## Features

- **Random Fact:** Users can view a random fact by clicking the "Learn Facts" button on the home page.
- **Fact of the Day:** Users can view the fact of the day by clicking the "Today's Fact" button on the Fact Viewer page.
- **Save Facts:** Authenticated users can save their favorite facts by clicking the "+" button next to the fact.
- **Delete Facts:** Users can delete individual saved facts or delete all saved facts at once.
- **Language Support:** The application supports English and German languages. Users can switch between languages using the language dropdown menu.
- **Authentication:** The application uses Auth0 for authentication and authorization, allowing users to securely log in and log out.

## Technologies Used

- **Next.js:** Next.js is used as the framework to build the React application. It provides server-side rendering and other features.
- **Tailwind CSS:** Tailwind CSS is used to style the user interface. It provides a utility-first approach to styling.
- **Auth0:** Auth0 is used for authentication and authorization.
- **React Icons:** React Icons is used to display icons throughout the application.
- **Next/Image:** Next/Image is used to optimize and display images.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository:** `git clone https://github.com/emrerbay/fact-generator`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory
   - Add the following environment variables to the file:
     ```
     NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
     NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
     NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000/api/auth/callback
     ```
4. **Start the development server:** `npm run dev`
5. **Open your browser and go to http://localhost:3000**

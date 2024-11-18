🎬 Movie Library App

A web application that allows users to explore popular movies, view detailed information, and search for their favorite films. Built with Next.js,Typescript, Tailwind CSS, and TMDB API.


🚀 Features

🎥 Browse popular movies using the TMDB API
🔍 Search for movies by title
📜 View detailed movie information on a separate page
⭐ Save favorite movies to a dedicated page
⚡ Infinite scrolling for the homepage movie grid
📱 Fully responsive design with Tailwind CSS


🛠️ Tech Stack

Next.js: Framework for server-rendered React applications
TypeScript: Type-safe JavaScript for enhanced code quality
Tailwind CSS: Utility-first CSS framework for rapid UI development
TMDB API: Provides access to a database of movies

🖥️ Getting Started

1. Clone the Repository

git clone https://github.com/skizziedevs/movie-app.git
cd movie-library

2. Install Dependencies

npm install

3. Set Up Environment Variables
Create a .env.local file in the root directory and add your TMDB API key:
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

4. Run the Development Server: 
npm run dev
The app will be available at http://localhost:3000

5. Build for Production:
npm run build
npm start

✨ Design Decisions and Trade-offs

1. Technology Stack
   - **Next.js** was chosen for its efficient server-side rendering (SSR) and routing capabilities, improving page load times and SEO.
   - **TypeScript** ensures type safety, reducing bugs and enhancing maintainability.
   - **Tailwind CSS** was used for rapid UI development, resulting in a clean and consistent design.

2. **Infinite Scrolling**
   - Implemented on the homepage to enhance user experience by loading more movies as users scroll.
   - **Trade-off**: Increases data fetches, which can impact performance, but improves engagement for users exploring movie lists.

3. **Dynamic Routing**
   - Utilized for the movie detail page (`/movie/[id]`), making URLs clean and SEO-friendly.
   - **Trade-off**: Requires extra API calls for each dynamic page but improves scalability and modularity.

4. **Component-based Structure**
   - Extracted reusable components like `MovieCard` and `SearchBar` to promote code reuse and scalability.
   - **Trade-off**: Slightly increases initial development time but results in easier future maintenance.

5. **API Data Fetching**
   - Used client-side fetching with `fetch` for simplicity and quick data retrieval.
   - **Trade-off**: Dependent on user's network speed, which may cause slower loading on weaker connections.

These design decisions were made to prioritize performance, scalability, and a smooth user experience.

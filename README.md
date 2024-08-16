# Next.js Movies

This is a Next.js application that allows users to search for movies using the TMDB API. It fetches movie data based on user queries and displays the results in a responsive grid layout.

## Features

- **Search Functionality:** Users can search for movies by title.
- **Debounced Search:** The app uses debounced input to minimize unnecessary API calls.
- **Responsive Design:** The layout adapts to different screen sizes.
- **Dynamic Routing:** Each movie links to a detailed page using Next.js dynamic routing.

## Tech Stack

- **Next.js:** Framework for server-side rendering and static site generation.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **TypeScript:** For type-safe JavaScript development.
- **TMDB API:** Used to fetch movie data.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/pnvdev/nextjs-movies.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to see the app in action.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

## Deployment

This app can be easily deployed on Vercel, the platform from the creators of Next.js.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Thanks to [TMDB](https://www.themoviedb.org/) for providing the movie data API.

import Link from "next/link";
import Image from "next/image";

interface MoviesProps {
  searchParams: {
    query?: string;
  };
}

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MoviesResponse {
  results: Movie[];
}

export async function Movies({ searchParams }: MoviesProps) {
  const { query } = searchParams;
  const search = query || "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  };

  let movies;

  if (!search) {
    movies = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
  } else {
    movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    );
  }

  const { results }: MoviesResponse = await movies.json();

  if (results && results.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.slice(0, 20).map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative h-96 w-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                layout="fill"
                objectFit="cover"
                alt={movie.title}
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 h-20 w-60">
                {movie.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}

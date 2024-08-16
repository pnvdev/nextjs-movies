import Image from "next/image";

interface PageProps {
  params: { id: string };
}

interface MovieDetails {
  poster_path: string;
  overview: string;
  release_date: string;
  title: string;
  vote_count: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  runtime: number;
}

interface Person {
  profile_path: string;
  name: string;
  character?: string;
  job?: string;
}

interface Credits {
  cast: Person[];
  crew: Person[];
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  };

  const resDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const details: MovieDetails = await resDetails.json();

  const resCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );
  const credits: Credits = await resCredits.json();

  const {
    poster_path,
    overview,
    release_date,
    title,
    vote_count,
    genres,
    vote_average,
    runtime,
  } = details;

  const { cast, crew } = credits;

  const year = release_date.split("-")[0];
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 bg-gray-100">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-0 mx-auto">
          <div className="lg:w-4/4 mx-auto flex flex-wrap">
            <Image
              alt={title}
              className="lg:w-1/4 w-full lg:h-full h-64 object-cover object-center rounded-xl shadow-gray-500 shadow-xl "
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              height={561}
              width={374}
            />
            <div className="lg:w-3/4 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-5xl title-font font-medium mb-2">
                {title}
              </h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                {year}
                {" •"} {`${hours}h ${minutes}m`}
              </h2>

              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-yellow-300 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-black">
                  <span className="text-base">{vote_average.toFixed(1)}</span>
                  <span className="text-gray-500 font-normal">{` / 10`}</span>
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <span className="text-sm font-medium text-gray-900 dark:text-black">
                  {`${vote_count} votes`}
                </span>
              </div>
              <p className="leading-relaxed">{overview}</p>
              <p className="my-3">
                {genres.map((genre, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2"
                  >
                    {genre.name}
                  </span>
                ))}
              </p>
              {cast.length > 0 &&
                cast.filter((item) => item.profile_path).length > 0 && (
                  <div className="w-full overflow-hidden mt-4">
                    <h1 className="text-gray-900 text-base title-font font-bold">{`Cast`}</h1>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {cast.slice(0, 10).map((person, pk) => {
                        if (!person.profile_path) {
                          return null;
                        }
                        return (
                          <div
                            key={pk}
                            className="flex flex-col border-2 border-slate-300 rounded-xl overflow-hidden shadow-lg w-36"
                          >
                            <div className="">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                                alt={person.name}
                                height={210}
                                width={140}
                                className="w-full"
                              />
                            </div>
                            <div className="h-24 p-4">
                              <p className="text-sm font-extrabold text-left">
                                {person.name}
                              </p>
                              <p className="text-sm text-left">
                                {person.character}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {crew.length > 0 &&
                crew.filter((item) => item.profile_path).length > 0 && (
                  <div className="w-full overflow-hidden mt-4">
                    <h1 className="text-gray-900 text-base title-font font-bold">{`Crew`}</h1>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {crew.slice(0, 10).map((person, pk) => {
                        if (!person.profile_path) {
                          return null;
                        }
                        return (
                          <div
                            key={pk}
                            className="flex flex-col border-2 border-slate-300 rounded-xl overflow-hidden shadow-lg w-36"
                          >
                            <div className="">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                                alt={person.name}
                                height={210}
                                width={140}
                              />
                            </div>
                            <div className="h-24 p-4">
                              <p className="text-sm font-extrabold text-left">
                                {person.name}
                              </p>
                              <p className="text-sm text-left">{person.job}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

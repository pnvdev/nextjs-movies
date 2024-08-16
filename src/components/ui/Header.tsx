import Link from "next/link";
import SearchBar from "../SearchBar";
import { Suspense } from "react";

export async function Header() {
  return (
    <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      {/* <!-- Logo text or image --> */}
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-grey-darkest">
          <Link
            className="no-underline text-grey-darkest hover:text-black"
            href="/"
          >
            Next.js Movies
          </Link>
        </h1>

        <a className="text-black hover:text-orange md:hidden" href="#">
          <i className="fa fa-2x fa-bars"></i>
        </a>
      </div>
      {/* <!-- END Logo text or image --> */}

      {/* <!-- Search field --> */}
      <Suspense>
        <SearchBar />
      </Suspense>
      {/* <!-- END Search field --> */}

      {/* <!-- Global navigation --> */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4">
            <a
              className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
              href="#"
            >
              Categories
            </a>
          </li>
          <li className="md:ml-4">
            <a
              className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
              href="#"
            >
              Movies
            </a>
          </li>
          <li className="md:ml-4">
            <a
              className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
              href="#"
            >
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

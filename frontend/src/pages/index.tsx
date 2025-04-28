import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/businesses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Head>
        <title>Business Directory - Find Local Businesses</title>
        <meta
          name="description"
          content="Discover and connect with local businesses in your area. Find reviews, ratings, and detailed information about businesses near you."
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Find the Perfect Business for Your Needs
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover top-rated local businesses, read reviews from real customers,
                  and find exactly what you're looking for in your area.
                </p>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mt-8">
                  <div className="flex max-w-md gap-x-4">
                    <label htmlFor="search" className="sr-only">
                      Search businesses
                    </label>
                    <div className="relative flex-auto">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600"
                        placeholder="Search businesses..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/businesses"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Browse All Businesses
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    List Your Business <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            alt="Business meeting"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore businesses by category and find exactly what you need.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/businesses?category=${category.slug}`}
                className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center hover:bg-gray-100"
              >
                <category.icon
                  className="h-12 w-12 text-primary-600"
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Sample categories data (you can move this to a separate file)
const categories = [
  {
    name: 'Restaurants',
    slug: 'restaurants',
    icon: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    description: 'Find the best dining experiences near you',
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    icon: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    description: 'Connect with healthcare professionals',
  },
  {
    name: 'Technology',
    slug: 'technology',
    icon: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    description: 'Discover tech companies and services',
  },
]; 
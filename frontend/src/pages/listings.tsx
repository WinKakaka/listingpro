import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviews: string[];
  logo?: {
    url: string;
    public_id: string;
  };
}

export default function Listings() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { category, search } = router.query;

  useEffect(() => {
    fetchBusinesses();
  }, [category, search]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const params = new URLSearchParams();
      if (category) params.append('category', category as string);
      if (search) params.append('search', search as string);

      const { data } = await axios.get<{ data: Business[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/businesses`,
        { params }
      );
      setBusinesses(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(true);
      toast.error('Failed to fetch businesses');
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: '/listings',
      query: { ...router.query, category: e.target.value },
    });
  };

  return (
    <>
      <Head>
        <title>Business Listings - Business Directory</title>
        <meta name="description" content="Browse all business listings" />
      </Head>

      <div className="py-10">
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Business Listings
          </h1>
        </header>
        
        <main className="mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
          {/* Filters and Actions */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <select
              value={category?.toString() || ''}
              onChange={handleCategoryChange}
              aria-label="Filter by category"
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              <option value="Restaurant">Restaurants</option>
              <option value="Retail">Retail</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Construction">Construction</option>
              <option value="Finance">Finance</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Automotive">Automotive</option>
              <option value="Other">Other</option>
            </select>

            <Link
              href="/add-listing"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Add Your Business
            </Link>
          </div>

          {/* Business List */}
          <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-md">
            {loading ? (
              <div className="p-8 text-center">
                <div className="text-lg font-medium">Loading businesses...</div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                Failed to load businesses. Please try again later.
              </div>
            ) : businesses.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No businesses found matching your criteria
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {businesses.map((business) => (
                  <li key={business._id}>
                    <Link
                      href={`/businesses/${business._id}`}
                      className="block hover:bg-gray-50"
                      aria-label={`View ${business.name} details`}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex min-w-0 items-center space-x-4">
                            {business.logo?.url && (
                              <div className="flex-shrink-0">
                                <Image
                                  src={business.logo.url}
                                  alt={`${business.name} logo`}
                                  width={48}
                                  height={48}
                                  className="rounded-full"
                                  quality={80}
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-primary-600">
                                {business.name}
                              </p>
                              <p className="mt-1 truncate text-sm text-gray-500">
                                {business.category}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex flex-shrink-0 items-center">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500">
                                Rating: {business.rating.toFixed(1)} (
                                {business.reviews.length} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {business.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Business {
  _id: string;
  name: string;
  category: string;
  status: string;
  rating: number;
  reviews: string[];
  createdAt: string;
}

export default function Dashboard() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchUserBusinesses();
  }, [user, router]);

  const fetchUserBusinesses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/businesses?owner=${user?.id}`
      );
      setBusinesses(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch businesses');
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - Business Directory</title>
        <meta name="description" content="Manage your business listings" />
      </Head>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Add Business Button */}
            <div className="mt-8">
              <Link
                href="/businesses/new"
                className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Add New Business
              </Link>
            </div>

            {/* Business List */}
            <div className="mt-8">
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : businesses.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No businesses found. Add your first business listing!
                  </div>
                ) : (
                  <ul role="list" className="divide-y divide-gray-200">
                    {businesses.map((business) => (
                      <li key={business._id}>
                        <div className="block hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="truncate">
                                <div className="flex items-center">
                                  <p className="truncate text-sm font-medium text-primary-600">
                                    {business.name}
                                  </p>
                                </div>
                                <div className="mt-2 flex">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <span className="truncate">
                                      {business.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-2 flex flex-shrink-0">
                                <span
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(
                                    business.status
                                  )}`}
                                >
                                  {business.status}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm text-gray-500">
                                  <span>
                                    Rating: {business.rating.toFixed(1)} (
                                    {business.reviews.length} reviews)
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <Link
                                  href={`/businesses/${business._id}/edit`}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  Edit
                                </Link>
                                <span className="mx-2">·</span>
                                <Link
                                  href={`/businesses/${business._id}`}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 
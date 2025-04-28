import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt: string;
}

interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviews: Review[];
  logo?: {
    url: string;
    public_id: string;
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
}

export default function BusinessDetails() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/businesses/${id}`
      );
      setBusiness(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch business details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!business) {
    return <div className="p-4 text-center text-gray-500">Business not found</div>;
  }

  return (
    <>
      <Head>
        <title>{business.name} - Business Directory</title>
        <meta name="description" content={business.description} />
      </Head>

      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                {business.logo && (
                  <img
                    src={business.logo.url}
                    alt={business.name}
                    className="h-16 w-16 rounded-full"
                  />
                )}
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {business.name}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    {business.category}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">About</h2>
                <p className="mt-2 text-gray-500">{business.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-500">
                    <span className="font-medium">Address:</span> {business.address}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium">Email:</span> {business.contact.email}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium">Phone:</span> {business.contact.phone}
                  </p>
                  {business.contact.website && (
                    <p className="text-gray-500">
                      <span className="font-medium">Website:</span>{' '}
                      <a
                        href={business.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-500"
                      >
                        {business.contact.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
                <div className="mt-2">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {business.rating.toFixed(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({business.reviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {business.reviews.map((review) => (
                    <div key={review._id} className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${
                                  i < review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-500">{review.comment}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        - {review.user.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
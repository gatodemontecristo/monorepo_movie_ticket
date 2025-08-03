'use client';

import React, { useEffect, useState } from 'react';
import { MovieService } from '@/services/movie.service';

interface TestData {
  totalResults: number;
  totalPages: number;
  moviesCount: number;
  firstMovie?: string;
}

interface TestResult {
  success: boolean;
  url?: string;
  headers?: Record<string, string>;
  data?: TestData;
  error?: string;
}

export default function TMDBTestPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testTMDBConnection = async () => {
    setLoading(true);
    setTestResult(null);

    // Guardar referencia al fetch original
    const originalFetch = global.fetch;
    let requestInfo: { url: string; headers: Record<string, string> } = {
      url: '',
      headers: {},
    };

    try {
      // Interceptar la request para ver los headers
      global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        requestInfo = {
          url: input.toString(),
          headers: init?.headers
            ? Object.fromEntries(Object.entries(init.headers))
            : {},
        };
        return originalFetch(input, init);
      };

      // Hacer la petición
      const response = await MovieService.getPopular({ page: 1 });

      setTestResult({
        success: true,
        url: requestInfo.url,
        headers: requestInfo.headers,
        data: {
          totalResults: response.total_results,
          totalPages: response.total_pages,
          moviesCount: response.results.length,
          firstMovie: response.results[0]?.title,
        },
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      // Restaurar fetch original siempre
      global.fetch = originalFetch;
      setLoading(false);
    }
  };

  useEffect(() => {
    testTMDBConnection();
  }, []);

  return (
    <div className='bg-movie-black min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-movie-duck mb-8 font-mont'>
        TMDB API Connection Test 🧪
      </h1>

      <div className='max-w-4xl mx-auto'>
        {loading && (
          <div className='text-movie-duck text-xl text-center'>
            Testing TMDB connection...
          </div>
        )}

        {testResult && (
          <div
            className={`rounded-lg p-6 border-2 ${
              testResult.success
                ? 'bg-green-900/20 border-green-500'
                : 'bg-red-900/20 border-red-500'
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                testResult.success ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {testResult.success
                ? '✅ Connection Successful!'
                : '❌ Connection Failed!'}
            </h2>

            {testResult.success && (
              <>
                <div className='mb-6'>
                  <h3 className='text-movie-duck font-bold text-lg mb-2'>
                    Request Details:
                  </h3>
                  <div className='bg-movie-metal/10 p-4 rounded border border-movie-metal'>
                    <p className='text-movie-metal text-sm mb-2'>
                      <strong>URL:</strong>
                    </p>
                    <code className='text-movie-yellow text-xs break-all'>
                      {testResult.url}
                    </code>
                  </div>
                </div>

                <div className='mb-6'>
                  <h3 className='text-movie-duck font-bold text-lg mb-2'>
                    Headers Sent:
                  </h3>
                  <div className='bg-movie-metal/10 p-4 rounded border border-movie-metal'>
                    <pre className='text-movie-metal text-sm overflow-x-auto'>
                      {JSON.stringify(testResult.headers, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className='mb-6'>
                  <h3 className='text-movie-duck font-bold text-lg mb-2'>
                    Response Data:
                  </h3>
                  <div className='bg-movie-metal/10 p-4 rounded border border-movie-metal'>
                    <div className='grid grid-cols-2 gap-4 text-movie-metal'>
                      <div>
                        <strong>Total Results:</strong>{' '}
                        {testResult.data?.totalResults}
                      </div>
                      <div>
                        <strong>Total Pages:</strong>{' '}
                        {testResult.data?.totalPages}
                      </div>
                      <div>
                        <strong>Movies Returned:</strong>{' '}
                        {testResult.data?.moviesCount}
                      </div>
                      <div>
                        <strong>First Movie:</strong>{' '}
                        {testResult.data?.firstMovie}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='text-center'>
                  <button
                    onClick={testTMDBConnection}
                    className='bg-movie-duck hover:bg-movie-yellow text-movie-black font-bold py-3 px-6 rounded-lg font-caros'
                  >
                    🔄 Test Again
                  </button>
                </div>
              </>
            )}

            {!testResult.success && (
              <>
                <div className='mb-6'>
                  <h3 className='text-red-400 font-bold text-lg mb-2'>
                    Error Details:
                  </h3>
                  <div className='bg-red-900/10 p-4 rounded border border-red-500'>
                    <p className='text-red-300'>{testResult.error}</p>
                  </div>
                </div>

                <div className='text-center'>
                  <button
                    onClick={testTMDBConnection}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg font-caros'
                  >
                    🔄 Retry Test
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Header Information */}
        <div className='mt-8 bg-movie-metal/10 rounded-lg p-6 border border-movie-metal'>
          <h3 className='text-movie-duck font-bold text-lg mb-4'>
            Expected Headers:
          </h3>
          <div className='space-y-2 text-movie-metal text-sm'>
            <p>
              <strong>Accept:</strong> application/json
            </p>
            <p>
              <strong>Content-Type:</strong> application/json
            </p>
            <p>
              <strong>Authorization:</strong> Bearer{' '}
              {process.env.NEXT_PUBLIC_TMDB_API_KEY?.substring(0, 20)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

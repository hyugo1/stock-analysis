// app/unsubscribe/page.tsx

import Link from "next/link";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const success = params.success === "true";
  const error = params.error;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0f14] p-4">
      <div className="max-w-md w-full bg-[#0e1116] rounded-xl border border-[#1f2937] p-8 text-center">
        {success ? (
          <>
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Successfully Unsubscribed
            </h1>
            <p className="text-gray-400 mb-6">
              You will no longer receive daily news emails from MarketPulse.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Changed your mind?
              </p>
              <Link
                href="/"
                className="inline-block w-full bg-[#10b981] hover:bg-[#059669] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : error ? (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Unsubscribe Failed
            </h1>
            <p className="text-gray-400 mb-6">
              {error === "missing_token"
                ? "No unsubscribe token was provided. Please use the link from your email."
                : error === "invalid_token"
                ? "This unsubscribe link is invalid or has expired. Please contact support or try unsubscribing again from your email preferences."
                : "Something went wrong. Please try again or contact support."}
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-[#1f2937] hover:bg-[#374151] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#10b981]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Unsubscribe from Daily News
            </h1>
            <p className="text-gray-400 mb-6">
              Are you sure you want to stop receiving daily market news summaries?
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-[#10b981] hover:bg-[#059669] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Keep Me Subscribed
              </Link>
              <p className="text-xs text-gray-500">
                If you wish to unsubscribe, please use the link in your email
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
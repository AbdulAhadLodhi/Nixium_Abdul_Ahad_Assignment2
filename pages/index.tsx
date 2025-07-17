import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleSummarise = async () => {
    if (!url.trim()) {
      setSummary("Please enter a blog URL.");
      setShowSummary(true);
      return;
    }

    setLoading(true);
    setShowSummary(false);
    setSummary("");

    try {
      const response = await axios.post("/api/summarise", { url });
      setSummary(response.data.summary);
      setShowSummary(true);
    } catch (error) {
      setSummary("Error summarising the blog.");
      setShowSummary(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl transition-transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 tracking-tight">
          Blog Summariser
        </h1>

        <input
          type="text"
          placeholder="Paste your blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
        />

        <button
          onClick={handleSummarise}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Summarising...
            </span>
          ) : (
            "Summarise"
          )}
        </button>

        {showSummary && (
          <div
            className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6 shadow-inner animate-fade-in"
            style={{ animation: "fadeIn 0.5s ease-in-out" }}
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Summary:
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}

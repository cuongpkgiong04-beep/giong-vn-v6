import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { debugCheckins } from "@/routes/api/debug-checkins";

export const Route = createFileRoute("/debug-neon")({
  component: DebugNeonPage,
});

function DebugNeonPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    debugCheckins()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <pre className="p-4 text-red-500">Error: {error}</pre>;
  if (!data) return <pre className="p-4">Loading...</pre>;

  return (
    <pre className="p-4 text-sm overflow-auto bg-gray-900 text-green-400 min-h-screen">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

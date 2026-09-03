import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { debugCheckins } from "@/routes/api/debug-checkins";
export const Route = createFileRoute("/debug-neon")({ component: () => {
  const [d, setD] = useState<any>(null);
  useEffect(() => { debugCheckins().then(setD).catch(e => setD({error: e.message})); }, []);
  return <pre className="p-4 text-xs bg-gray-900 text-green-400 min-h-screen overflow-auto">{d ? JSON.stringify(d, null, 2) : "Loading..."}</pre>;
}});

// Debug component to check environment variables in Agent context
"use client";

import { useEffect, useState } from "react";

export function VapiDebug() {
  const [envDebug, setEnvDebug] = useState<Record<string, any>>({});

  useEffect(() => {
    setEnvDebug({
      NEXT_PUBLIC_VAPI_WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ? "✅ Set" : "❌ Not set",
      NEXT_PUBLIC_VAPI_WORKFLOW_ID: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID || "❌ Not set",
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
      <h4 className="font-bold mb-2">Agent Environment Debug:</h4>
      <pre>{JSON.stringify(envDebug, null, 2)}</pre>
    </div>
  );
}

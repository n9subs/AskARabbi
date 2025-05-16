"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "../providers/AuthProvider";

export default function History() {
  const { userId } = useAuth();
  const history = useQuery(api.history.list, { userId: userId! });

  if (!userId || !history) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">ההיסטוריה שלך</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">עדיין לא נשאלו שאלות</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <p className="font-medium text-gray-900">{item.question}</p>
              <p className="mt-2 text-gray-600">{item.answer.tanakh}</p>
              <p className="mt-2 text-sm text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
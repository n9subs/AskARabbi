"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import RouteGuard from '../components/RouteGuard';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import ConfirmationModal from '../components/ConfirmationModal';

export default function HistoryPage() {
  const router = useRouter();
  const { userId, isLoading: authLoading } = useAuth();
  const deleteItemMutation = useMutation(api.history.deleteItem);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Id<"history"> | null>(null);

  const userHistory = useQuery(
    api.history.list,
    userId ? { userId: userId as Id<"users"> } : "skip"
  );

  const handleDeleteClick = (historyItemId: Id<"history">) => {
    setItemToDelete(historyItemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDeletion = async () => {
    if (!itemToDelete) return;

    try {
      await deleteItemMutation({ historyItemId: itemToDelete });
      closeModal();
    } catch (error) {
      console.error("Failed to delete history item:", error);
      alert("שגיאה במחיקת הפריט מההיסטוריה.");
      closeModal();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center p-4 sm:p-8">
        <header className="w-full max-w-3xl mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[var(--primary)]">
            היסטוריית שאלות
          </h1>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-md hover:bg-[var(--secondary)] transition-colors font-medium text-sm"
          >
            חזרה לדף הראשי
          </button>
        </header>

        <main className="w-full max-w-3xl">
          {userHistory === undefined && !authLoading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
              <p className="text-lg text-[var(--foreground)] opacity-75">טוען היסטוריה...</p>
            </div>
          )}

          {userHistory && userHistory.length === 0 && (
            <div className="text-center py-10 bg-white/50 p-6 rounded-lg shadow">
              <p className="text-xl text-[var(--foreground)]">
                עדיין לא שאלת שאלות.
              </p>
              <p className="text-sm text-[var(--foreground)] opacity-75 mt-2">
                השאלות והתשובות שלך יופיעו כאן לאחר שתשאל.
              </p>
            </div>
          )}

          {userHistory && userHistory.length > 0 && (
            <div className="space-y-6">
              {userHistory.map((item) => (
                <div 
                  key={item._id}
                  className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out relative"
                >
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="absolute top-4 left-4 p-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-full transition-colors duration-150 ease-in-out shadow"
                    title="מחק שאלה זו"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="mb-4 pb-2 border-b border-gray-200 pr-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-1">שאלה:</h3>
                    <p className="text-lg text-[var(--primary)]">
                      {item.question}
                    </p>
                  </div>
                  
                  <div className="space-y-5">
                    {item.answer.tanakh && (
                      <div className="border-r-4 border-[#0d3677] pr-4">
                        <h4 className="text-lg font-bold mb-1.5 text-[#0d3677]">מהתנ&quot;ך</h4>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{item.answer.tanakh}</p>
                      </div>
                    )}
                    {item.answer.talmud && (
                      <div className="border-r-4 border-[#7a5901] pr-4">
                        <h4 className="text-lg font-bold mb-1.5 text-[#7a5901]">מהתלמוד וההלכה</h4>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{item.answer.talmud}</p>
                      </div>
                    )}
                    {item.answer.web && (
                      <div className="border-r-4 border-[#2a6b31] pr-4">
                        <h4 className="text-lg font-bold mb-1.5 text-[#2a6b31]">ממקורות מודרניים</h4>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{item.answer.web}</p>
                      </div>
                    )}
                    {item.answer.summary && (
                      <div className="border-r-4 border-gray-500 pr-4 mt-5 pt-3 border-t border-gray-200">
                        <h4 className="text-lg font-bold mb-1.5 text-gray-700">לסיכום</h4>
                        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{item.answer.summary}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 text-left mt-4 pt-3 border-t border-gray-100">
                    נשאל בתאריך: {new Date(item.timestamp).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDeletion}
          title="אישור מחיקה"
          message="האם אתה בטוח שברצונך למחוק פריט זה מההיסטוריה? לא ניתן לשחזר פעולה זו."
          confirmText="מחק"
          cancelText="ביטול"
        />
      </div>
    </RouteGuard>
  );
} 
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import RouteGuard from '../components/RouteGuard';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import ConfirmationModal from '../components/ConfirmationModal';
import HistoryItem from '../components/HistoryItem';
import { usePostHog } from 'posthog-js/react';

export default function HistoryPage() {
  const router = useRouter();
  const { userId, isLoading: authLoading } = useAuth();
  const deleteItemMutation = useMutation(api.history.deleteItem);
  const posthog = usePostHog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Id<"history"> | null>(null);

  const userHistory = useQuery(
    api.history.list,
    userId ? { userId: userId as Id<"users"> } : "skip"
  );

  useEffect(() => {
    if (posthog && userId) {
      posthog.capture('history_page_viewed');
    }
    // Intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [posthog, userId]);

  const handleDeleteClick = (historyItemId: Id<"history">) => {
    setItemToDelete(historyItemId);
    setIsModalOpen(true);
    if (posthog) {
      posthog.capture('history_delete_prompt_shown', { historyItemId });
    }
  };

  const closeModal = () => {
    if (itemToDelete && isModalOpen) {
      if (posthog) {
        posthog.capture('history_delete_prompt_canceled', { historyItemId: itemToDelete });
      }
    }
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDeletion = async () => {
    if (!itemToDelete) return;

    if (posthog) {
      posthog.capture('history_delete_confirmed', { historyItemId: itemToDelete });
    }

    try {
      await deleteItemMutation({ historyItemId: itemToDelete });
      closeModal();
    } catch (error) {
      console.error("Failed to delete history item:", error);
      alert("שגיאה במחיקת הפריט מההיסטוריה.");
      setIsModalOpen(false);
      setItemToDelete(null);
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
            <div className="space-y-4">
              {userHistory.map((item) => (
                <HistoryItem 
                  key={item._id}
                  item={item}
                  onDeleteClick={handleDeleteClick}
                />
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
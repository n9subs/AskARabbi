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
  const { userId, isLoading: authLoading, signOut, userName, isAnonymousUser } = useAuth();
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
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] dark:bg-[var(--background)] dark:text-[var(--foreground)] flex flex-col">
        <header className="p-4 bg-[var(--primary)] text-[var(--background)]">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-sm flex-shrink-0">
              בס&quot;ד
            </div>

            <div className="flex-grow text-center px-4">
              <h1 className="text-2xl sm:text-3xl font-bold">היסטוריית שאלות</h1>
              <p className="mt-1 text-xs sm:text-sm">שָׁאַלְתָּ&apos;רבָ</p>
            </div>

            <div className="flex-shrink-0">
              {userId ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="text-xs sm:text-sm text-[var(--background)]">
                    {isAnonymousUser ? "אורח" : userName || "טוען..."}
                  </div>

                  <button
                    onClick={() => router.push("/")}
                    className="px-2.5 py-1 bg-slate-200 text-[var(--primary)] rounded-md hover:bg-slate-300/80 transition-colors font-medium text-xs shadow-sm"
                  >
                    דף ראשי
                  </button>

                  <button
                    onClick={() => { if (signOut) signOut(); router.push("/auth/sign-in"); }}
                    className="px-2.5 py-1 bg-white text-[var(--primary)] rounded-md hover:bg-slate-100 transition-colors font-medium text-xs shadow-sm"
                  >
                    התנתק
                  </button>
                </div>
              ) : (
                <div className="h-[28px] w-[1px]">&nbsp;</div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto p-4 max-w-3xl">
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
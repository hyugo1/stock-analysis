'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { AlertTriangle, Trash2, Loader2, X, Check } from "lucide-react";

export function DeleteAccountSettings() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        toast.success('Account deleted successfully');
        // Redirect to sign-in page will happen automatically after signOut
        window.location.href = '/sign-in';
      } else {
        toast.error('Failed to delete account', {
          description: result.error || 'An error occurred while deleting your account'
        });
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account', {
        description: 'An error occurred while deleting your account'
      });
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="bg-[#0e1116] border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-all duration-300">
            <Trash2 className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse" />
        </div>
        
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
              Delete Account
            </h3>
            <p className="text-sm text-gray-400">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          
          {!showConfirmation ? (
            <Button
              variant="destructive"
              onClick={() => setShowConfirmation(true)}
              className="gap-2 bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 rounded-xl px-6 py-5 font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/20"
            >
              <Trash2 className="h-5 w-5" />
              Delete Account
            </Button>
          ) : (
            <div className="pt-2 space-y-3">
              {/* Warning message */}
              <div className="flex items-center justify-center gap-2 text-amber-400 text-sm bg-amber-500/10 px-4 py-3 rounded-xl border border-amber-500/20">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
                <span className="font-medium">Are you sure? This cannot be undone.</span>
              </div>
              
              {/* Buttons on one line */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isDeleting}
                  className="flex-1 border-[#1f2937] text-gray-300 hover:bg-[#1f2937] hover:text-white hover:border-[#2d3748] rounded-xl py-5 transition-all duration-300"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 gap-2 bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 rounded-xl py-5 font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Yes, Delete My Account
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


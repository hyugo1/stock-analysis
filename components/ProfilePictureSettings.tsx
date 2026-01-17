'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileImage } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { User, Link, Loader2, RotateCcw } from "lucide-react";

interface ProfilePictureSettingsProps {
  user: User;
}

export function ProfilePictureSettings({ user }: ProfilePictureSettingsProps) {
  const [imageUrl, setImageUrl] = useState(user.image || '');
  const [isUpdating, setIsUpdating] = useState(false);

  // Compute safe initial from user name or email
  const safeInitial = user?.name || user?.email || "?";

  const handleUpdateImage = async (url: string) => {
    if (!url.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateProfileImage(url.trim());
      if (result) {
        toast.success('Profile picture updated successfully!');
        setImageUrl(url.trim());
      } else {
        toast.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUseDefault = async () => {
    setIsUpdating(true);
    try {
      const result = await updateProfileImage('');
      if (result) {
        toast.success('Profile picture reset to default');
        setImageUrl('');
      } else {
        toast.error('Failed to reset profile picture');
      }
    } catch (error) {
      console.error('Error resetting profile image:', error);
      toast.error('Failed to reset profile picture');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#0e1116] border border-[#1f2937] rounded-xl p-6 hover:border-[#2d3748] transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <AvatarImage
              src={imageUrl || user.image || "https://github.com/shadcn.png"}
              alt={user.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-wealth-gold to-amber-600 text-foreground text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
              {safeInitial[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-wealth-gold transition-colors duration-300">
              Profile Picture
            </h3>
            <p className="text-sm text-gray-400">
              Enter the URL of your profile picture below
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-[#0a1628] border-[#1f2937] text-white placeholder:text-gray-500 pl-10 pr-4 py-6 rounded-xl focus:ring-2 focus:ring-wealth-gold/50 focus:border-wealth-gold transition-all duration-300 hover:border-[#2d3748]"
              />
            </div>
            <Button
              variant="premium"
              onClick={() => handleUpdateImage(imageUrl)}
              disabled={isUpdating || !imageUrl.trim()}
              className="px-6 py-6 rounded-xl font-semibold btn-shine hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Tip: Use services like{' '}
            <a 
              href="https://gravatar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-wealth-gold hover:underline transition-colors duration-300"
            >
              Gravatar
            </a>
            , or upload an image to an image host and paste the URL here.
          </p>

          {(user.image || imageUrl) && (
            <Button
              variant="outline"
              onClick={handleUseDefault}
              disabled={isUpdating}
              className="gap-2 border-[#1f2937] text-gray-300 hover:bg-[#1f2937] hover:text-white hover:border-[#2d3748] rounded-xl px-4 py-5 transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4" />
              Use Default
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

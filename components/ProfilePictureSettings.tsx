'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileImage, UpdateProfileImageError, UpdateProfileImageResult } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { User as UserIcon, Link, Loader2, RotateCcw } from "lucide-react";

interface ProfilePictureSettingsProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// List of trusted services for the help text
const TRUSTED_SERVICES = [
  { domain: 'avatars.githubusercontent.com', service: 'GitHub Avatar' },
  { domain: 'googleusercontent.com', service: 'Google (Images, Photos, Drive)' },
  { domain: 'graph.microsoft.com', service: 'Microsoft/Azure AD' },
  { domain: 'storage.googleapis.com', service: 'Google Cloud Storage' },
  { domain: 'github.com', service: 'GitHub' },
  { domain: 'images.unsplash.com', service: 'Unsplash' },
];

export function ProfilePictureSettings({ user }: ProfilePictureSettingsProps) {
  const [imageUrl, setImageUrl] = useState(user.image || '');
  const [isUpdating, setIsUpdating] = useState(false);

  // Compute safe initial from user name or email
  const safeInitial = user?.name || user?.email || "?";

  const getErrorMessage = (error: UpdateProfileImageError, hostname?: string): { title: string; description: string } => {
    switch (error) {
      case 'invalid_url':
        return {
          title: 'Invalid URL Format',
          description: 'The URL you entered is not valid. Please check for typos and ensure it starts with http:// or https://'
        };
      case 'invalid_protocol':
        return {
          title: 'Invalid Protocol',
          description: 'Only HTTP and HTTPS URLs are allowed. The URL must start with http:// or https://'
        };
      case 'missing_hostname':
        return {
          title: 'Missing Hostname',
          description: 'The URL appears to be missing a domain name. Please enter a complete image URL'
        };
      case 'untrusted_domain':
        return {
          title: 'Untrusted Image Domain',
          description: `The domain "${hostname || 'unknown'}" is not allowed for security reasons.`
        };
      default:
        return {
          title: 'Unknown Error',
          description: 'An unexpected error occurred while updating your profile picture'
        };
    }
  };

  const handleUpdateImage = async (url: string) => {
    if (!url.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    setIsUpdating(true);
    const result: UpdateProfileImageResult = await updateProfileImage(url.trim());
    
    if (result.success) {
      toast.success('Profile picture updated successfully!', {
        style: { background: '#065f46', color: '#ecfdf5', border: '1px solid #10b981' }
      });
      setImageUrl(url.trim());
    } else {
      const errorInfo = getErrorMessage(result.error, result.hostname);
      toast.error(errorInfo.title, {
  description: errorInfo.description,
  duration: 8000,
  style: { background: '#7f1d1d', color: '#fef2f2', border: '1px solid #ef4444' },
  action: {
    label: 'View Allowed Services',
    onClick: () => {
      const serviceList = TRUSTED_SERVICES.map(s => 
        `${s.service} (${s.domain})`
      ).join('\n');

      toast.info('IMAGE SERVICES\n\n' + serviceList, {
        duration: 10000,
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #3b82f6',
          whiteSpace: 'pre-wrap'
        }
      });
    },
  },
  actionButtonStyle: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#fee2e2',
    border: '1px solid rgba(248, 113, 113, 0.4)',
  }
});
    }
    setIsUpdating(false);
  };

  const handleUseDefault = async () => {
    setIsUpdating(true);
    const result: UpdateProfileImageResult = await updateProfileImage('');
    
    if (result.success) {
      toast.success('Profile picture reset to default', {
        style: { background: '#065f46', color: '#ecfdf5', border: '1px solid #10b981' }
      });
      setImageUrl('');
    } else {
      toast.error('Failed to reset profile picture', {
        style: { background: '#7f1d1d', color: '#fef2f2', border: '1px solid #ef4444' }
      });
    }
    setIsUpdating(false);
  };

  return (
    <div className="bg-[#0e1116] border border-[#1f2937] rounded-xl p-6 hover:border-[#2d3748] transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <AvatarImage
              src={imageUrl || user.image || "https://github.com/shadcn.png"}
              alt={user.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-wealth-gold to-amber-600 text-foreground text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
              {safeInitial[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-white" />
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
            Tip: Use images from trusted services:{' '}
            <span className="text-wealth-gold">GitHub Avatar</span>,{' '}
            <span className="text-wealth-gold">Google</span>,{' '}
            <span className="text-wealth-gold">Microsoft</span>,{' '}
            <span className="text-wealth-gold">Google Cloud Storage</span>, or{' '}
            <span className="text-wealth-gold">Unsplash</span>.
            <br />
            Upload to one of these services and paste the URL here.
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

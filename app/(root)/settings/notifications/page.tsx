import { NotificationSettings } from '@/components/NotificationSettings';
import { ProfilePictureSettings } from "@/components/ProfilePictureSettings";
import { DeleteAccountSettings } from "@/components/DeleteAccountSettings";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotificationsSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || undefined
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
          <ProfilePictureSettings user={user} />
        </section>

        {/* Email Notifications Section */}
        <section className="pt-6 border-t border-[#1f2937]">
          <h2 className="text-lg font-semibold text-white mb-4">Email Notifications</h2>
          <NotificationSettings />
        </section>

        <section className="pt-6 border-t border-[#1f2937]">
          <h2 className="text-lg font-semibold text-white mb-4">About Email Notifications</h2>
          <div className="bg-[#0e1116] border border-[#1f2937] rounded-xl p-6 text-gray-400 text-sm space-y-3">
            <p>
              <strong className="text-white">Daily News Summary:</strong> Receive a daily email with market news tailored to your watchlist and general market updates.
            </p>
            <p>
              You can unsubscribe at any time by clicking the unsubscribe link in any email or by toggling the switch above.
            </p>
          </div>
        </section>

        {/* Delete Account Section */}
        <section className="pt-6 border-t border-[#1f2937]">
          <DeleteAccountSettings />
        </section>
      </div>
    </div>
  );
}
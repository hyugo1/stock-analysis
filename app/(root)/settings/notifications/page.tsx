import { NotificationSettings } from '@/components/NotificationSettings';

export default function NotificationsSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Notification Settings</h1>
        <p className="text-gray-400">
          Manage your email preferences and notification settings
        </p>
      </div>

      <div className="space-y-6">
        <section>
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
      </div>
    </div>
  );
}


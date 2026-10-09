import { businessSettings } from '@/config/business';

export function AnnouncementBar() {
  return (
    <div className="bg-forest-800 text-white">
      <div className="container-page flex h-9 items-center justify-center">
        <p className="text-xs font-medium tracking-wide text-forest-100 sm:text-sm">
          {businessSettings.tagline}
        </p>
      </div>
    </div>
  );
}

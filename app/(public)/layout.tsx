import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyBottomBar from '@/components/layout/StickyBottomBar';
import { getServerShopSettings } from '@/lib/supabase-server';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getServerShopSettings();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyBottomBar
        phoneNumber={settings.phone}
        whatsappNumber={settings.whatsapp_number}
        afterHoursNote={settings.after_hours_note}
      />
    </>
  );
}

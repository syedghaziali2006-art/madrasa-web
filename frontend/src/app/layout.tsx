import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدرسہ صاحب الزمان (عج) | دینی و عصری علوم کا بین الاقوامی مرکز",
  description: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) - پلاٹ بی 25، احسن آباد 3، گلزار ہجری، اسکیم 33، کراچی، پاکستان۔ حوزوی تعلیم، ناظرہ، خطابت، کمپیوٹر لیب اور ہاسٹل سہولیات۔",
  keywords: [
    "مدرسہ صاحب الزمان",
    "صاحب الزمان",
    "حوزہ علمیہ کراچی",
    "داخلے جاری ہیں",
    "احسن آباد کراچی",
    "دینی تعلیم",
    "حفظ و ناظرہ",
    "کمپیوٹر لیب"
  ],
  icons: {
    icon: "/images/madarsa-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Katibeh&family=Amiri+Quran&family=Aref+Ruqaa:wght@400;700&family=Gulzar&family=Noto+Nastaliq+Urdu:wght@400..700&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@400;600;700;800;900&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/0d1f326972a300f933249ae1a301c68c?family=DecoType+Thuluth+II"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#070E18] text-[#F8FAFC] selection:bg-[#E5A93C] selection:text-[#070E18] antialiased">
        {children}
      </body>
    </html>
  );
}

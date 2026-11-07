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

import "./globals.css";

export const metadata = {
  title: "MagnumInsights",
  description: "Immigration Consultants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

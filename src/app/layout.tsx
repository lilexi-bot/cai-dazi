import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '财搭子 - 面向年轻人的AI理财陪伴应用',
  description: '一个懂金融、懂年轻人、更懂闭嘴的AI理财陪伴伙伴。不替代判断，只陪伴成长。',
  keywords: ['AI理财', '理财陪伴', '年轻人理财', '财搭子', '智能理财'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}

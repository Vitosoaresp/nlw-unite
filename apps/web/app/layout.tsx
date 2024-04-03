import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from './components/header';
import './globals.css';
import ReactQueryProvider from './provider/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Turborepo',
	description: 'Generated by create turbo',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-zinc-950 max-w-[1216px] mx-auto py-5 text-zinc-50 antialiased flex flex-col gap-5`}
			>
				<ReactQueryProvider>
					<Header />
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}

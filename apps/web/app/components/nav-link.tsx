import Link, { LinkProps } from 'next/link';
import { cn } from '../lib/utils';

interface NavLinkProps extends LinkProps {
	children: React.ReactNode;
	className?: string;
}

export function NavLink({ children, className, ...props }: NavLinkProps) {
	return (
		<Link
			{...props}
			className={cn('font-medium text-sm text-zinc-300', className)}
		>
			{children}
		</Link>
	);
}

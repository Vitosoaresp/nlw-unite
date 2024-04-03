import { ComponentProps } from 'react';
import { cn } from '../lib/utils';

interface IconButtonProps extends ComponentProps<'button'> {}

export function IconButton(props: IconButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				'bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-50',
				props.className,
			)}
		/>
	);
}

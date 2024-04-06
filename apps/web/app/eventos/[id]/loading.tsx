import { Skeleton } from '@app/components/ui/skeleton';

export default function EventSkeleton() {
	return (
		<div>
			<div className="grid grid-cols-3 gap-4">
				<Skeleton className="h-10 bg-zinc-900" />
				<Skeleton className="h-10 bg-zinc-900" />
				<Skeleton className="h-10 bg-zinc-900" />
			</div>
			<Skeleton className="w-20 h-8 mt-4" />
		</div>
	);
}

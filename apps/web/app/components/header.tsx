'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NavLink } from './nav-link';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from './ui/breadcrumb';

export const Header = () => {
	const pathname = usePathname();

	const lastPath = pathname.split('/').pop();
	const eventId = pathname.includes('/participantes')
		? pathname.split('/')[2]
		: lastPath !== 'eventos'
			? lastPath
			: null;
	console.log(eventId);

	return (
		<header className="flex items-center gap-5 py-2">
			<Image src="/unite-icon.svg" width={32} height={32} alt="" />

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<NavLink href="/eventos">Eventos</NavLink>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{eventId && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<NavLink href={`/eventos/${eventId}`}>{eventId}</NavLink>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
					{pathname.includes('/participantes') && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<NavLink href={`/eventos/${eventId}/participantes`}>
										Participantes
									</NavLink>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
};

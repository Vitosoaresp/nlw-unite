'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSetParams = () => {
	const { replace } = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setParams = (newParams: Record<string, string | number>) => {
		const params = new URLSearchParams(searchParams);
		Object.keys(newParams).forEach(key => {
			params.set(key, String(newParams[key as string]));
		});

		replace(`${pathname}?${params.toString()}`);
	};

	const search = searchParams.get('search') ?? '';
	const page = Number(searchParams.get('page') ?? 1);
	const perPage = Number(searchParams.get('perPage') ?? 10);

	return {
		setParams,
		params: {
			search,
			page,
			perPage,
		},
	};
};

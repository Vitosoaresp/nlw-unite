'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSetParams = () => {
	const { replace } = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setParams = (newParams: string, value: string) => {
		const params = new URLSearchParams(searchParams);
		if (!value) {
			params.delete(newParams);
		} else {
			params.set(newParams, value);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	return { setParams };
};

'use client';

import { Input } from '@app/components/ui/input';
import { useSetParams } from '@app/hooks/use-set-params';
import { Search } from 'lucide-react';

export const SearchBar = () => {
	const { setParams } = useSetParams();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParams('search', e.target.value);
	};

	return (
		<div className="relative w-72">
			<Search className="absolute top-1/2 -translate-y-1/2 left-3 size-4 text-emerald-300" />
			<Input
				className="px-3 pl-8 py-1.5 boder-white/10 bg-transparent rounded-lg text-sm w-72"
				placeholder="Buscar participantes"
				onChange={handleSearch}
			/>
		</div>
	);
};

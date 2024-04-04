'use client';

import { useSetParams } from '@app/hooks/use-set-params';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';
import { IconButton } from './icon-button';
import { TableCell, TableRow } from './ui/table';

interface TablePaginationProps {
	totalPages: number;
	total: number;
	page: number;
}

export const TablePagination = ({
	total,
	totalPages,
	page,
}: TablePaginationProps) => {
	const { setParams } = useSetParams();
	const handleNextPage = () => {
		setParams({ page: page + 1 });
	};

	const handlePrevPage = () => {
		setParams({ page: page - 1 });
	};

	const handleFirstPage = () => {
		setParams({ page: 1 });
	};

	const handleLastPage = () => {
		setParams({ page: totalPages });
	};

	return (
		<TableRow>
			<TableCell colSpan={3}>Mostrando 10 de {total} items</TableCell>
			<TableCell className="text-right" colSpan={3}>
				<div className="inline-flex gap-8 items-center">
					<span>
						Pagina {page} de {totalPages}
					</span>
					<div className="flex gap-1.5">
						<IconButton onClick={handleFirstPage} disabled={page === 1}>
							<ChevronsLeft className="size-4" />
						</IconButton>
						<IconButton onClick={handlePrevPage} disabled={page === 1}>
							<ChevronLeft className="size-4" />
						</IconButton>
						<IconButton onClick={handleNextPage} disabled={page === totalPages}>
							<ChevronRight className="size-4" />
						</IconButton>
						<IconButton onClick={handleLastPage} disabled={page === totalPages}>
							<ChevronsRight className="size-4" />
						</IconButton>
					</div>
				</div>
			</TableCell>
		</TableRow>
	);
};

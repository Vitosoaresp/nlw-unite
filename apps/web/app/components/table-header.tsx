import { cn } from '@app/lib/utils';
import { ArrowUp } from 'lucide-react';
import { TableHeader as Root, TableHead, TableRow } from './ui/table';

export type TableColumns = {
	label: string;
	value: string;
	isDisabledSort?: boolean;
};

interface TableHeaderProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {
	columns: TableColumns[];
	handleChangeOrder: (column: string) => void;
	orderBy: string;
	sort: string;
}

export const TableHeader = ({
	columns,
	handleChangeOrder,
	orderBy,
	sort,
	...props
}: TableHeaderProps) => {
	return (
		<Root {...props}>
			<TableRow style={{ height: 47 }}>
				{columns.map(column => (
					<TableHead key={column.value}>
						{column.isDisabledSort && (
							<span className="mr-4">{column.label}</span>
						)}
						{!column.isDisabledSort && (
							<span
								className="inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
								onClick={() => handleChangeOrder(column.value)}
							>
								{column.label}{' '}
								<ArrowUp
									className={cn(
										'size-4 text-zinc-50 transition-all',
										orderBy !== column.value
											? 'opacity-0 flex-shrink-0'
											: 'opacity-100',
										sort === 'asc' ? 'rotate-0' : 'rotate-180',
									)}
								/>
							</span>
						)}
					</TableHead>
				))}
				<TableHead style={{ width: '50px' }} />
			</TableRow>
		</Root>
	);
};

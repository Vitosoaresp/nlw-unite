'use client';

import 'dayjs/locale/pt-br';

import { IconButton } from '@app/components/icon-button';
import { SearchBar } from '@app/components/search-bar';
import { TableColumns, TableHeader } from '@app/components/table-header';
import { TablePagination } from '@app/components/table-pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableRow,
} from '@app/components/ui/table';
import { useSetParams } from '@app/hooks/use-set-params';
import { getEventAttendeesFn } from '@app/service/get-event-attendees';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CircleDashed, MoreHorizontal } from 'lucide-react';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const columns: TableColumns[] = [
	{ label: 'Código', value: 'id' },
	{ label: 'Participantes', value: 'name' },
	{ label: 'Data de inscrição', value: 'createdAt' },
	{ label: 'Data de criação', value: 'checkedInAt', isDisabledSort: true },
];

export const AttendeeList = ({ eventId }: { eventId: string }) => {
	const { params, setParams } = useSetParams({ orderBy: 'id' });
	const { data, isLoading } = useQuery({
		queryFn: () => getEventAttendeesFn({ ...params, eventId }),
		queryKey: ['attendees', params],
		retry: 1,
		keepPreviousData: true,
	});

	const attendees = data?.attendees ?? [];

	const total = data?.total ?? 0;
	const totalPages = Math.ceil(total / params.perPage);

	const handleChangeOrder = (column: string) => {
		const isSameColumn = params.orderBy === column;
		const sort = isSameColumn
			? params.sort === 'asc'
				? 'desc'
				: 'asc'
			: params.sort;
		setParams({ orderBy: column, sort });
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-3 items-center">
				<h1 className="text-2xl font-bold">Participantes</h1>

				<SearchBar />
			</div>

			<Table className="w-full">
				<TableHeader
					columns={columns}
					handleChangeOrder={handleChangeOrder}
					orderBy={params.orderBy}
					sort={params.sort}
				/>

				<TableBody>
					{isLoading && (
						<TableRow>
							<TableCell colSpan={columns.length + 2} className="text-center">
								<div className="flex justify-center items-center">
									<CircleDashed className="animate-spin size-6" />
								</div>
							</TableCell>
						</TableRow>
					)}
					{!isLoading &&
						attendees?.map(attendee => (
							<TableRow key={attendee.id} className="border-white/10">
								<TableCell>{attendee.id}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<span className="font-semibold text-white">
											{attendee.name}
										</span>
										<span>{attendee.email}</span>
									</div>
								</TableCell>
								<TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
								<TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
								<TableCell>
									<IconButton className="bg-black/20 border-white/10">
										<MoreHorizontal className="size-4" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
				</TableBody>

				<TableFooter className="bg-transparent border-t-white/10">
					<TablePagination
						page={params.page}
						total={total}
						totalPages={totalPages}
						headerColumnsLength={columns.length + 2}
						perPage={params.perPage}
					/>
				</TableFooter>
			</Table>
		</div>
	);
};

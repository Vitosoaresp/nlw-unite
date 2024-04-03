import { IconButton } from '@app/components/icon-button';
import { Checkbox } from '@app/components/ui/checkbox';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@app/components/ui/table';
import { attendees } from '@app/data/attendees';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from 'lucide-react';
import { SearchBar } from './search-bar';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const AttendeeList = () => {
	return (
		<div className="space-y-4">
			<div className="flex gap-3 items-center">
				<h1 className="text-2xl font-bold">Participantes</h1>

				<SearchBar />
			</div>

			<Table className="w-full">
				<TableHeader>
					<TableRow style={{ height: 47 }}>
						<TableHead style={{ width: '48px' }}>
							<Checkbox />
						</TableHead>
						<TableHead>Código</TableHead>
						<TableHead>Participantes</TableHead>
						<TableHead>Data de inscrição</TableHead>
						<TableHead>Data de criação</TableHead>
						<TableHead style={{ width: '64px' }} />
					</TableRow>
				</TableHeader>
				<TableBody>
					{attendees.map(attendee => (
						<TableRow key={attendee.id} className="border-white/10">
							<TableCell>
								<Checkbox />
							</TableCell>
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
					<TableRow>
						<TableCell colSpan={3}>Mostrando 10 de 100 items</TableCell>
						<TableCell className="text-right" colSpan={3}>
							<div className="inline-flex gap-8 items-center">
								<span>Pagina 1 de 23</span>
								<div className="flex gap-1.5">
									<IconButton>
										<ChevronsLeft className="size-4" />
									</IconButton>
									<IconButton>
										<ChevronLeft className="size-4" />
									</IconButton>
									<IconButton>
										<ChevronRight className="size-4" />
									</IconButton>
									<IconButton disabled>
										<ChevronsRight className="size-4" />
									</IconButton>
								</div>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
};

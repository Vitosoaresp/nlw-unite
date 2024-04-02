import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
	Search,
} from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHeader,
	TableRow,
} from './ui/table';

export const AttendeeList = () => {
	return (
		<div className="space-y-4">
			<div className="flex gap-3 items-center">
				<h1 className="text-2xl font-bold">Participantes</h1>

				<div className="relative w-72">
					<Search className="absolute top-1/2 -translate-y-1/2 left-3 size-4 text-emerald-300" />
					<Input
						className="px-3 pl-8 py-1.5 boder-white/10 bg-transparent rounded-lg text-sm w-72"
						placeholder="Buscar participantes"
					/>
				</div>
			</div>

			<div className="border border-white/10 rounded-lg">
				<Table className="w-full">
					<TableHeader>
						<TableRow style={{ height: 47 }}>
							<TableCell
								style={{ width: '48px' }}
								className="py-3 px-4 text-sm font-semibold text-left"
							>
								<Checkbox />
							</TableCell>
							<TableCell className="py-3 px-4 text-sm font-semibold text-left">
								Código
							</TableCell>
							<TableCell className="py-3 px-4 text-sm font-semibold text-left">
								Participantes
							</TableCell>
							<TableCell className="py-3 px-4 text-sm font-semibold text-left">
								Data de inscrição
							</TableCell>
							<TableCell className="py-3 px-4 text-sm font-semibold text-left">
								Data de criação
							</TableCell>
							<TableCell
								style={{ width: '64px' }}
								className="py-3 px-4 text-sm font-semibold text-left"
							/>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, i) => (
							<TableRow key={i} className="border-white/10">
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									<Checkbox />
								</TableCell>
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									123421
								</TableCell>
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									<div className="flex flex-col gap-1">
										<span className="font-semibold text-white">Jon jhoe</span>
										<span>jonjhoe@gmail.com</span>
									</div>
								</TableCell>
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									3 dias atrás
								</TableCell>
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									3 dias atrás
								</TableCell>
								<TableCell className="py-3 px-4 text-sm text-zinc-300">
									<button className="bg-black/20 border border-white/10 rounded-md p-1.5">
										<MoreHorizontal className="size-4" />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter className="bg-transparent border-t-white/10">
						<TableRow>
							<TableCell
								className="py-3 px-4 text-sm text-zinc-300"
								colSpan={3}
							>
								Mostrando 10 de 100 items
							</TableCell>
							<TableCell
								className="py-3 px-4 text-sm text-zinc-300 text-right"
								colSpan={3}
							>
								<div className="inline-flex gap-8 items-center">
									<span>Pagina 1 de 23</span>
									<div className="flex gap-1.5">
										<button className="bg-white/10 border border-white/10 rounded-md p-1.5">
											<ChevronsLeft className="size-4" />
										</button>
										<button className="bg-white/10 border border-white/10 rounded-md p-1.5">
											<ChevronLeft className="size-4" />
										</button>
										<button className="bg-white/10 border border-white/10 rounded-md p-1.5">
											<ChevronRight className="size-4" />
										</button>
										<button className="bg-white/10 border border-white/10 rounded-md p-1.5">
											<ChevronsRight className="size-4" />
										</button>
									</div>
								</div>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
};

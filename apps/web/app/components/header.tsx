import Image from 'next/image';

export const Header = () => {
	return (
		<header className="flex items-center gap-5 py-2">
			<Image src="/unite-icon.svg" width={32} height={32} alt="" />

			<nav>
				<ul className="flex items-center gap-5">
					<li>
						<a className="font-medium text-sm text-zinc-300">Eventos</a>
					</li>
					<li>
						<a className="font-medium text-sm">Participantes</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

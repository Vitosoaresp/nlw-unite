import Image from 'next/image';
import { NavLink } from './nav-link';

export const Header = () => {
	return (
		<header className="flex items-center gap-5 py-2">
			<Image src="/unite-icon.svg" width={32} height={32} alt="" />

			<nav>
				<ul className="flex items-center gap-5">
					<li>
						<NavLink href="/eventos">Eventos</NavLink>
					</li>
					<li>
						<NavLink href="/participantes">Participantes</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

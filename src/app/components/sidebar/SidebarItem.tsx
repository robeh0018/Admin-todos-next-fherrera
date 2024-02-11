'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props {
	name: string;
	href: string;
	icon: React.ReactNode
}

export const SidebarItem = ({icon, name, href}: Props) => {

	const pathName = usePathname();

	return (
		<li>
			<Link
				href={href}
				className={
					`relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600
				hover:bg-gradient-to-r hover:from-sky-400 hover:to-cyan-300  hover:text-white
				${href === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
				`}>
				{icon}
				<span className="-mr-1 font-medium">{name}</span>
			</Link>
		</li>
	);
};
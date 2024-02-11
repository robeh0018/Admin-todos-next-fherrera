import Image from "next/image";
import Link from "next/link";
import {SidebarItem} from "@/app/components/sidebar/SidebarItem";
import {
	IoBasketOutline,
	IoCalendarOutline,
	IoCheckboxOutline,
	IoFastFoodOutline,
	IoListOutline,
	IoPersonOutline
} from "react-icons/io5";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {LogoutButton} from "@/app/components";

const sidebarItems = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: <IoCalendarOutline size={30}/>
	},
	{
		name: 'Rest Todos',
		href: '/dashboard/rest-todos',
		icon: <IoCheckboxOutline size={30}/>
	},
	{
		name: 'Server Actions',
		href: '/dashboard/server-todos',
		icon: <IoListOutline size={30}/>
	},
	{
		name: 'Cookies',
		href: '/dashboard/cookies',
		icon: <IoFastFoodOutline size={30}/>
	},
	{
		name: 'Products',
		href: '/dashboard/products',
		icon: <IoBasketOutline size={30}/>
	},
	{
		name: 'Profile',
		href: '/dashboard/profile',
		icon: <IoPersonOutline size={30}/>
	},
]

export const Sidebar = async () => {

	const session = await getServerSession(authOptions);
	const user = session?.user;

	return (
		<aside
			className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
			<div>
				<div className="-mx-6 px-6 py-4">
					{/* TODO: Next/Link hacia dashboard */}
					<Link href='/dashboard' title="home">
						{/* Next/Image */}
						<Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
							   width={150}
							   height={150}
							   className="w-32"
							   alt="tailus logo"/>
					</Link>
				</div>

				<div className="mt-8 text-center">
					{/* Next/Image */}
					<Image src={user?.image ?? ''} alt=""
						   width={150}
						   height={150}
						   className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
					<h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{user?.name}</h5>
					<span className="hidden text-gray-400 lg:block capitalize">
						{user?.roles?.join(', ') ?? 'no-roles'}
					</span>
				</div>

				<ul className="space-y-2 tracking-wide mt-8">
					{/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
					{
						sidebarItems.map(item => (
							<SidebarItem key={item.name} {...item}/>
						))
					}
				</ul>
			</div>

			<div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<LogoutButton/>
			</div>
		</aside>);
};
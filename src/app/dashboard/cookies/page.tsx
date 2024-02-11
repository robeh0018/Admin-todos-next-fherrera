import {cookies} from "next/headers";

import {TabBar} from "@/app/components";

export const metadata = {
	title: 'Cookies page',
	description: 'Cookies page description',
}

export default function CookiesPage() {

	const cookiesStore = cookies();
	const cookieTap = cookiesStore.get('selectedTap')?.value ?? '1';

	return (
		<div className='gird grid-cols-1 sm:grid-cols-2 gap-3'>

			<div className='flex flex-col'>
				<span className='text-3xl'>Tabs</span>

				<TabBar currentTab={Number(cookieTap)}/>
			</div>


		</div>
	)
}
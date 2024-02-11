'use client'

import {useSession} from "next-auth/react";

export default function ProfilePage() {

	const {data: session} = useSession();

	return (
		<div>
			<h1>Profile page.</h1>
			<hr/>
			<div className='flex flex-col gap-3'>

				<div className='flex flex-col'>
					<span className='font-bold'>Name:</span>
					<span>{session?.user?.name ?? 'No name'}</span>
				</div>

				<div className='flex flex-col'>
					<span className='font-bold'>Email:</span>
					<span>{session?.user?.email ?? 'No email'}</span>
				</div>

				<div className='flex flex-col'>
					<span className='font-bold'>Image Url:</span>
					<span>{session?.user?.image ?? 'No image'}</span>
				</div>

				<div className='flex flex-col'>
					<span className='font-bold'>Image Url:</span>
					<span>{session?.user?.id ?? 'No UUID'}</span>
				</div>

				<div className='flex flex-col'>
					<span className='font-bold'>Image Url:</span>
					<span className='capitalize'>{session?.user?.roles?.join(', ') ?? 'No roles'}</span>
				</div>


			</div>
		</div>
	)
}
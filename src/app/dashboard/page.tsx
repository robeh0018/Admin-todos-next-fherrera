import {WidgetItem} from "@/app/components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function DashboardPage() {

		const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/api/auth/signin')
	}
	return (
		<div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
			<WidgetItem title='Conected user SS'>
				<div className='flex flex-col gap-3'>

					<div className='flex flex-col'>
						<span className='font-bold'>Name:</span>
						<span>{session.user?.name}</span>
					</div>

					<div className='flex flex-col'>
						<span className='font-bold'>Email:</span>
						<span>{session.user?.email}</span>
					</div>

					<div className='flex flex-col'>
						<span className='font-bold'>Image Url:</span>
						<span>{session.user?.image}</span>
					</div>

				</div>
			</WidgetItem>
		</div>
	)
}
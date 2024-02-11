import prisma from "@/lib/prisma";
import {NewTodo, TodosGrid} from "@/todos";
import * as authActions from "@/auth/actions/auth-actions";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export default async function ServerTodosPage() {

	const user = await authActions.getUserSessionServer();

	if (!user) redirect('/	api/auth/signin');

	const todos = await prisma.todo.findMany({
		where: {
			userId: user?.id,
		},
		orderBy: {description: 'asc'}
	})

	const completedTodos = todos.filter(todo => todo.complete)
	return (
		<>
			<div className='mb-5'>
				<span className='text-xl font-bold'>Server Actions</span>
			</div>

			<div>
				<div className='w-full px-3 mx-5 mb-5'>

					<NewTodo haveCompletedTodos={completedTodos.length !== 0}/>
				</div>

				<TodosGrid todos={todos}/>
			</div>
		</>
	)
}
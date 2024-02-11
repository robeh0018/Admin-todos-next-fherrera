'use client';

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {IoTrashOutline} from "react-icons/io5";
import {addTodo, deleteCompleted} from "@/todos/actions/todo-actions";
import {createTodo} from "@/todos/helpers/todos";

// import * as todosApi from '@/todos/helpers/todos'

interface Props {
	haveCompletedTodos: boolean;
}

export const NewTodo = ({haveCompletedTodos}: Props) => {

	const [description, setDescription] = useState('')
	const router = useRouter();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (description.trim().length === 0) return;

		//await addTodo(description)
		await createTodo(description);
		router.refresh();

		setDescription('');
	}

	/*	const handleDeleteCompleted = async () => {
			await deleteCompleted()
		}*/

	return (
		<form className='flex w-full' onSubmit={onSubmit}>
			<input type="text"
				   className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
				   placeholder="¿Qué necesita ser hecho?"
				   onChange={(e) => setDescription(e.target.value)}
				   value={description}
			/>

			<button type='submit'
					className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
				Create
			</button>

			<span className='flex flex-1'></span>

			<button
				disabled={!haveCompletedTodos}
				onClick={() => deleteCompleted()}
				type='button'
				className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
				<IoTrashOutline/>
				<span className='ml-2'>Delete completed</span>
			</button>

		</form>
	)
}
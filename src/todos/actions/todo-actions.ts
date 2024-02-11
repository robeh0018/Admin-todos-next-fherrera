'use server'

import prisma from "@/lib/prisma";
import {Todo} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {getUserSessionServer} from "@/auth/actions/auth-actions";

export const sleep = async (seconds: number): Promise<string> => {

	return new Promise(resolve => {
		setTimeout(() => {
			resolve('Ok');
		}, seconds * 1000)
	})
};


export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

	await sleep(3);

	const todo = await prisma.todo.findFirst({where: {id}});

	if (!todo) {
		throw `Todo with id ${id} not fount`
	}

	const updatedTodo = await prisma.todo.update({
		where: {id},
		data: {complete: !complete}
	});

	revalidatePath('/dashboard/server-todos')
	return updatedTodo;
}


export const addTodo = async (description: string) => {

	try {
		const user = await getUserSessionServer();
		const todo = await prisma.todo.create({data: {description, userId: user?.id ?? ''}})

		revalidatePath('/dashboard/server-todos');

		return todo;
	} catch (e) {

		return {
			message: `Error creating a todo`
		}
	}
}

export const deleteCompleted = async () => {

	try {
		await prisma.todo.deleteMany({where: {complete: true}})

		revalidatePath('/dashboard/server-todos');
	} catch (e) {

		return {
			message: `Error removing completed todos`
		}
	}
}
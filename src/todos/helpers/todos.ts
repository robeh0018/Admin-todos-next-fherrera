import {Todo} from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {

	const body = {complete};

	return await fetch(`/api/todos/${id}`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
};

export const createTodo = async (description: string): Promise<Todo> => {

	const body = {description};

	return await fetch(`/api/todos`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
};


export const deleteCompletedTodos = async (): Promise<void> => {

	return await fetch(`/api/todos`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
}
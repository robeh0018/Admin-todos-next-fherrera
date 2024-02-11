import * as yup from 'yup';
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {Todo} from "@prisma/client";
import {getUserSessionServer} from "@/auth/actions/auth-actions";

interface Segments {
	params: { id: string }
}


const getTodo = async (id: string): Promise<Todo | null> => {


	const user = await getUserSessionServer();

	if (!user) {
		return null;
	}

	return prisma.todo.findFirst({where: {id, userId: user.id}});
}

export async function GET(req: Request, {params}: Segments) {

	const id = params.id;

	const todo = await getTodo(id);

	if (!todo) {
		return NextResponse.json({
			msg: `Todo with id '${id}' not found`
		}, {status: 404})
	}

	return NextResponse.json(todo);
}


const putSchema = yup.object({
	description: yup.string().optional(),
	complete: yup.boolean().optional(),
})

export async function PUT(req: Request, {params}: Segments) {

	const id = params.id;

	const todo = await getTodo(id);

	if (!todo) {
		return NextResponse.json({
			msg: `Todo with id '${id}' not found`
		}, {status: 404})
	}

	try {
		const {description, complete} = await putSchema.validate(await req.json());

		const updatedTodo = await prisma.todo.update({
			where: {id},
			data: {
				description,
				complete,
			}
		})

		return NextResponse.json(updatedTodo)
	} catch (e) {

		return NextResponse.json(e, {status: 400});
	}
}
import * as yup from 'yup';
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {getUserSessionServer} from "@/auth/actions/auth-actions";

export async function GET(req: Request) {

	const {searchParams} = new URL(req.url);
	const take = Number(searchParams.get('take') ?? '10');
	const skip = Number(searchParams.get('skip') ?? '0');

	if (isNaN(take)) {
		return NextResponse.json({
				msg: 'Take should be a number'
			}, {status: 400}
		)
	}

	if (isNaN(skip)) {
		return NextResponse.json({
				msg: 'Skip should be a number'
			}, {status: 400}
		)
	}

	const todos = await prisma.todo.findMany({take, skip});

	return NextResponse.json(todos)
}


const postSchema = yup.object({
	description: yup.string().required(),
	complete: yup.boolean().optional().default(false)
})

export async function POST(req: Request) {

	const user = await getUserSessionServer();

	if (!user) {
		return NextResponse.json('No authorized', {status: 401});
	}

	try {
		const {description, complete} = await postSchema.validate(await req.json());

		const todo = await prisma.todo.create({data: {complete, description, userId: user.id}})

		return NextResponse.json(todo)
	} catch (e) {

		return NextResponse.json(e, {status: 400})
	}
}

export async function DELETE() {

	const user = await getUserSessionServer();

	if (!user) {
		return NextResponse.json('No authorized', {status: 401});
	}

	try {
		await prisma.todo.deleteMany({where: {complete: true, userId: user.id}})

		return NextResponse.json({msg: 'Completed todos removed'})
	} catch (e) {

		return NextResponse.json(e, {status: 400})
	}
}

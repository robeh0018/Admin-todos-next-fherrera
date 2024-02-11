import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma";
import {User} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


export const getUserSessionServer = async () => {
	const session = await getServerSession(authOptions);

	return session?.user;
}

export const signInEmailAndPassword = async (email: string, password: string) => {

	if (!email || !password) return null;

	const user = await prisma.user.findUnique({where: {email}});

	if (!user) {
		return await createUser(email, password);
	}

	if (!bcrypt.compareSync(password, user.password ?? '')) {
		console.log('user was created')
		return null;
	}

	return user;
}

const createUser = (email: string, password: string): Promise<User> => {

	return prisma.user.create({
		data: {
			email,
			password: bcrypt.hashSync(password),
			name: email.split('@')[0],
		}
	})
}
import { addNewUser, deleteUser, getAllUsers, updateUser } from "@/app/(helpers)/FileManager"
import { User } from "@/app/(helpers)/types";
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
    const users = await getAllUsers()
    return NextResponse.json(users);
        
    } catch (error) {
        return NextResponse.json({ok: false, message: "Internal server error"}, {status: 500});
    }
}

export const POST = async (request: Request) => {

    try {
        const body: User = await request.json();

        if (!body?.firstName?.trim() || !body?.lastName?.trim() || !body?.position?.trim() || !body?.salary) {
            return NextResponse.json({ ok: false, message: "Please fill all the fields" }, { status: 400 });
        }

        await addNewUser(body);

        return NextResponse.json({
            ok: true,
            message: "Ok",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            message: "Internal server error"
        }, { status: 500 })
    }

}

export const PATCH = async (request: Request) => {

    try {
        const { id, ...body }: Partial<User> = await request.json();

        await updateUser(id!, body);

        return NextResponse.json({
            ok: true,
            message: "User updated"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            message: "Internal server error"
        }, { status: 500 })
    }

}

export const DELETE = async (request: Request) => {

    try {
        const { id } = await request.json();

        await deleteUser(id);
        return NextResponse.json({
            ok: true,
            message: "User deleted"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            message: "Internal server error"
        }, { status: 500 })
    }

}
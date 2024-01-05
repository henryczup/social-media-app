import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const { targetUserId } = await req.json();

    const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail }, })
    .then((user: any) => user?.id!);

    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId,
        }
    });

    return NextResponse.json(record);

}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const targetUserId = await req.nextUrl.searchParams.get("targetUserId");

    const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail }, })
    .then((user: any) => user?.id!);

    const record = await prisma.follows.deleteMany({
        where: {
            followerId_followingId: {
            followerId: currentUserId,
            followingId: targetUserId,
            },
        }
    });

    return NextResponse.json(record);

}
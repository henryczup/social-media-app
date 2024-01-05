import FollowClient from "./FollowClient";
import { prisma } from "../../lib/prisma";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface Props {
    targetUser: string;
}


export default async function FollowButton({ targetUser }: Props) {
    const session = await getServerSession(authOptions);

    const currentUserEmail = await prisma.user
    .findFirst({ where: { email: session?.user?.email! } })
    .then((user: any) => user?.id!);

    const isFollowing = await prisma.follow.findFirst({
        where: {
            followerId: currentUserEmail,
            followingId: targetUser,
        },
    });

    return (
        <FollowClient isFollowing={!!isFollowing} targetUser={targetUser} />
    );

}
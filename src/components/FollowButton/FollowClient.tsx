'use client'

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";



export default function FollowClient({ isFollowing, targetUser }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isMutating = isPending || isFetching;

    const follow = async () => {
        setIsFetching(true);

        const res = await fetch(`/api/follow?targetUserId=${targetUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setIsFetching(false);

        startTransition(() => {
            router.refresh();
        });

    };
    
    const unfollow = async () => {
        setIsFetching(true);

        const res = await fetch(`/api/follow?targetUserId=${targetUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setIsFetching(false);

        startTransition(() => {
            router.refresh();
        });
    };

    if (isMutating) {
        return (
            <button onClick={unfollow}>
                {!isMutating ? 'Unfollow' : '...'}
            </button>
        )
    } else {
        return (
            <button onClick={follow}>
                {!isMutating ? 'Follow' : '...'}
            </button>
        )
    }
}
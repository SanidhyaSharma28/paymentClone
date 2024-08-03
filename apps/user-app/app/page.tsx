"use client";

import { useRouter } from "next/navigation";

import { Home } from "../components/Home";

import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  const router = useRouter();

  if (!session.data) {
    return (
      <>
        <Home />
      </>
    );
  } else {
    router.push("/transfer");
  }
}
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={async ()=>{
        await signIn()
        window.location.href = "http://localhost:3001/signin";
      }} onSignout={async () => {
        await signOut()
        window.location.href = "http://localhost:3001/";
      }} user={session.data?.user} />
   </div>
  );
}

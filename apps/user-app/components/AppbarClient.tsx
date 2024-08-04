"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { sign } from "crypto";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={()=>router.push("/signin")} 
        onSignout={async () => {
        await signOut({ redirect: true, callbackUrl: `${window.location.origin}` })
     
       
      }} user={session.data?.user} />
   </div>
  );
}
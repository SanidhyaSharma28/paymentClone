import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";

import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";

export default async function () {
    const session = await getServerSession(authOptions);
       
    if(!session)
        {
         redirect('/signin')
        }  

return <div className="w-full">
        <SendCard/> 
    </div>
}
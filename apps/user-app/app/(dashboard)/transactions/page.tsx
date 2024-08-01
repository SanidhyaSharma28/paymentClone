// pages/your-page.tsx (or your actual file path)
import { getServerSession } from "next-auth";
import { TransactionsCard } from "../../../components/TransactionsCard";
import { Center } from "@repo/ui/center";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";

// Fetch balance data
async function getBalance() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { amount: 0, locked: 0 }; // Handle cases where session or userId is not available
    }
    const balance = await prisma.balance.findFirst({
        where: { userId: Number(session.user.id) }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}


// Fetch on-ramp transactions
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return []; // Handle cases where session or userId is not available
    }
    const txns = await prisma.onRampTransaction.findMany({
        where: { userId: Number(session.user.id) }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}
async function getSentP2P() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return []; // Handle cases where session or userId is not available
    }
    const txns = await prisma.p2pTransfer.findMany({
        where: { fromUserId: Number(session.user.id) }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to:t.toUserId
    }));
}
async function getReceivedP2P() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return []; // Handle cases where session or userId is not available
    }
    const txns = await prisma.p2pTransfer.findMany({
        where: { toUserId: Number(session.user.id) }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        from:t.fromUserId
    }));
}

// Default export function for the page
export default async function Page() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    const receivedP2P = await getReceivedP2P();
    const sentP2P = await getSentP2P();
    
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-4xl p-4">
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
            <div className="w-full max-w-4xl p-4">
                <TransactionsCard transactions={transactions} received={receivedP2P} sent={sentP2P} />
            </div>
        </div>
    );
}

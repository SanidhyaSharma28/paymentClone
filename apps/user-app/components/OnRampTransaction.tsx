import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    console.log(transactions);
    if (!transactions.length) {
        
        return <Card title="Recent Credits">
            <div className="text-center pb-8 pt-8">
                No Recent credits in Wallet
            </div>
        </Card>
    }
    return <Card title="Recent Credits">
        <div className="pt-2">
            {transactions.map(t => <div key={String(t.time)} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received request for INR
                    </div>
                    <div className="flex">
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}  
                    </div>
                    <div className="flex flex-col justify-center mx-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.provider}
                    </div>
                    <div className="flex flex-col justify-center mx-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="text-slate-600 text-xs">
                        Status: {t.status}
                    </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
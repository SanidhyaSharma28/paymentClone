"use client";

import { useState } from 'react';
import { OnRampTransactions } from './OnRampTransaction';
import { Card } from '@repo/ui/card';

const formatTo24Hour = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Pagination Component
const Pagination = ({ totalPages, currentPage, onPageChange }: {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}) => {
    return (
        <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    className={`py-1 px-2 border rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} hover:bg-blue-700 hover:text-white`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export function TransactionsCard({
    transactions,
    sent,
    received
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[],
    sent: {
        time: Date,
        amount: number,
        to: number
    }[],
    received: {
        time: Date,
        amount: number,
        from: number
    }[]
}) {
    const [activeTab, setActiveTab] = useState('tabs-with-underline-1'); // Default to Tab 1
    const [sentPage, setSentPage] = useState(1);
    const [receivedPage, setReceivedPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page

    const paginate = (items: any[], page: number, itemsPerPage: number) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    };

    const totalSentPages = Math.ceil(sent.length / itemsPerPage);
    const totalReceivedPages = Math.ceil(received.length / itemsPerPage);

    const displayedSent = paginate(sent, sentPage, itemsPerPage);
    const displayedReceived = paginate(received, receivedPage, itemsPerPage);

    return (
        <div className='w-full'>
            <div className="border-b border-gray-200">
                <nav className="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button
                        type="button"
                        className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none ${activeTab === 'tabs-with-underline-1' ? 'font-semibold border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                        id="tabs-with-underline-item-1"
                        aria-selected={activeTab === 'tabs-with-underline-1'}
                        role="tab"
                        onClick={() => setActiveTab('tabs-with-underline-1')}
                    >
                        Wallet Credits
                    </button>
                    <button
                        type="button"
                        className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none ${activeTab === 'tabs-with-underline-2' ? 'font-semibold border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                        id="tabs-with-underline-item-2"
                        aria-selected={activeTab === 'tabs-with-underline-2'}
                        role="tab"
                        onClick={() => setActiveTab('tabs-with-underline-2')}
                    >
                        P2P
                    </button>
                </nav>
            </div>

            <div className="mt-3">
                <div
                    id="tabs-with-underline-1"
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-1"
                    className={`${activeTab === 'tabs-with-underline-1' ? 'block' : 'hidden'}`}
                >
                    <div className="text-gray-500">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>

                <div
                    id="tabs-with-underline-2"
                    role="tabpanel"
                    aria-labelledby="tabs-with-underline-item-2"
                    className={`${activeTab === 'tabs-with-underline-2' ? 'block' : 'hidden'}`}
                >
                    <div className="text-gray-500 flex min-h-80">
                        <Card title='Sent'>
                            {sent.length === 0 ? (
                                <div className="text-center py-4">No recent debits.</div>
                            ) : (
                                <div >
                                    {displayedSent.map(t => (
                                        <div key={String(t.time)} className="flex justify-between my-2">
                                            <div>
                                                <div className="text-sm">To {t.to}</div>
                                                <div className="flex">
                                                    <div className="text-slate-600 text-xs">
                                                        {formatTo24Hour(t.time)}
                                                    </div>
                                                    <div className="flex flex-col justify-center mx-1">
                                                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    </div>
                                                    <div className="text-slate-600 text-xs">
                                                        {t.time.toDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                - Rs {t.amount / 100}
                                            </div>
                                        </div>
                                    ))}
                                    <div>

                                    <Pagination
                                        totalPages={totalSentPages}
                                        currentPage={sentPage}
                                        onPageChange={setSentPage}
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>

                        <Card title='Received'>
                            {received.length === 0 ? (
                                <div className="text-center py-4">No recent credits.</div>
                            ) : (
                                <div>
                                    {displayedReceived.map(t => (
                                        <div key={String(t.time)} className="flex justify-between my-2">
                                            <div>
                                                <div className="text-sm">From {t.from}</div>
                                                <div className="flex">
                                                    <div className="text-slate-600 text-xs">
                                                        {formatTo24Hour(t.time)}
                                                    </div>
                                                    <div className="flex flex-col justify-center mx-1">
                                                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    </div>
                                                    <div className="text-slate-600 text-xs">
                                                        {t.time.toDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                + Rs {t.amount / 100}
                                            </div>
                                        </div>
                                    ))}
                                    <div>

                                    <Pagination
                                        totalPages={totalReceivedPages}
                                        currentPage={receivedPage}
                                        onPageChange={setReceivedPage}
                                        />
                                        </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteInvoice } from '@/app/lib/actions';

export function DeleteInvoice({ id }: { id: string }) {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);

    return (
        <form action={deleteInvoiceWithId} onSubmit={(e) => {
            e.preventDefault();
            if (confirm("Are you sure?")) {
                deleteInvoiceWithId();
            }
        }}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
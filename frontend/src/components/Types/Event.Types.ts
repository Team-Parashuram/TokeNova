/* eslint-disable @typescript-eslint/no-explicit-any */
interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    time:string
    price: string;
    ticketsAvailable: number;
    totalTickets: number;
    imageUrl: string;
    organizer: string;
    category: string;
    calllback: any;
}

export type {
    Event
}
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    time:string
    price: number;
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
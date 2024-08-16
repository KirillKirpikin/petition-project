import { Status } from "./status.types";

interface ISubscribe {
    _id: string,
    email: string,
    passport: string,
    number: number,
    city:string
    requestId: string
    userName: string,
    inn: string,
    subscribe: Date
}

export interface IPetition {
    _id: string,
    petitionNumber: number,
    title: string,
    city: string,
    passport: string,
    userName: string,
    answer: string,
    email: string,
    text: string,
    topic: string,
    createdAt: Date,
    limit: number,
    finishedAt: Date,
    status: Status,
    goal: string,
    requestId: string,
    __v: number,
    subscriber: ISubscribe[]
}

export interface IPetitionAdd extends Pick<IPetition, 'title' | 'text' | 'topic' | 'goal'>{}

export interface IPetitionUser extends Pick<IPetition, 'city' | 'email' | 'passport'>{}
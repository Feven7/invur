import Express from 'express';

export interface iReq extends Express.Request {
    session: any;
    body: any;
    query: any;
}
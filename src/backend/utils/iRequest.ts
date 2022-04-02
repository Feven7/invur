import Express from 'express';

export interface iReq extends Express.Request {
    body: any;
    query: any;
    session: any;
    user?: any;
}
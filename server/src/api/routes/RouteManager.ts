import express from 'express';
import fetch from 'node-fetch';
import { iReq } from '../utils/iRequest';
const app = express.Router();

function bootstrap() {
    app.get('/', (req: iReq, res) => {
        const timeNow = new Date().getMilliseconds();
        fetch('/s').then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    return res.status(200).json({
                        success: true,
                        time: ((new Date().getMilliseconds()) - timeNow)
                    });
                }
            });
    });

    app.get('/s', (req, res) => {
        res.status(200).json({
            success: true,
            status: 'ok'
        });
    });
}

function routes() {

}

export default app;
import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import { iReq } from '../utils/iRequest';
import hCaptcha from './hCaptcha';
import Auth from './Auth';
const app = express.Router();

function bootstrap() {
    app.get('/', (req, res) => {
        const timeNow = new Date().getMilliseconds();
        fetch(`http://localhost:${process.env.PORT}/s`).then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    return res.status(200).json({
                        success: true,
                        time: `${((new Date().getMilliseconds()) - timeNow)}ms`
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

    app.get('/invite/:id', (req: iReq, res) => {
        const id = req.params.id;
        req.session.invite = id;
        res.redirect('/auth');
    });
}

function routes() {
    app.use('/api/hcaptcha', hCaptcha);
    app.use('/auth', Auth);
}

bootstrap();
routes();

export default app;
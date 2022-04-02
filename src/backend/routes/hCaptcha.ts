import 'dotenv/config';
import Express from 'express';
import hcaptcha from 'hcaptcha';
import { iReq } from '../utils/iRequest';
const router = Express.Router();

function bootstrap() {
    router.post('/auth', (req: iReq, res) => {
        if (req.body && req.body.token) {
            hcaptcha.verify(`${process.env.HCAPTCHA_SECRET}`, req.body.token)
                .then(data => {
                    if (!data.success) {
                        return res.status(400).json({
                            success: false,
                            message: 'Failed to verify captcha',
                            code: data['error-codes']
                        });
                    } else {
                        return res.status(200).json({
                            success: true
                        });
                    }
                })
        } else {
            res.status(400).json({
                success: false,
                message: 'Missing token'
            });
        }
    });
}

bootstrap();

export default router;
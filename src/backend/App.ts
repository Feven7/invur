import 'dotenv/config';
import './utils/DiscordStrategy';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';
import expressSession from 'express-session';
import routeManager from './routes/RouteManager';
import passport from 'passport';

export function bootstrap() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(helmet());

    app.use(morgan('combined'));

    const rateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(rateLimiter);

    app.use(expressSession({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', routeManager);

    app.listen(process.env.PORT || 8080, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
}
import 'dotenv/config';
import express from 'express';
import DiscordOAuth2 from 'discord-oauth2';
import passport from 'passport';
import { iReq } from '../utils/iRequest';
import mysql from 'mysql2/promise';

const router = express.Router();

async function bootstrap() {
    const oauth = new DiscordOAuth2({
        clientId: process.env.ID,
        clientSecret: process.env.SECRET,
        redirectUri: `${process.env.CALLBACK}`,
    });

    router.get('/', passport.authenticate('discord'));

    router.get('/failure', (req, res) => {
        res.send('<script>alert("Failed to authorize");</script>').redirect('/auth')
    });

    router.get('/join', passport.authenticate('discord', {
        failureRedirect: '/'
    }), async function (req: iReq, res) {

        // if(!req.session.invite || !req.session.hcaptcha)

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB
        });

        const guild: any = (await db.execute('SELECT guildid, activated FROM guilds WHERE code = ?', [req.session.invite]))[0];

        console.log(guild.activated);
        if (!guild.activated) {
            req.session.destroy();
            return res.status(400).send('<script>alert("This server\'s code is inactivated");</script>');
        }


        if (req.query.code == null || req.query.code == "") {
            req.session.destroy();
            res.status(400).send("No code provided");
        } else {
            if (req.user?.profile.id == null) {
                req.session.destroy();
                return res.status(400).send("Not logged in");
            } else {
                var params = new URLSearchParams();

                params.append('client_id', `${process.env.ID}`);
                params.append('client_secret', `${process.env.SECRET}`);
                params.append('refresh_token', req.user?.refreshToken);
                params.append('scope', ['identify', 'guilds', 'guilds.join'].join(' '));
                params.append('grant_type', 'refresh_token');
                params.append('redirect_uri', `${process.env.CALLBACK}`);
                var response = await fetch('https://discord.com/api/oauth2/token', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: params
                }).then(ress => ress.json());

                // if (response.error) {
                //     req.session.destroy();
                //     return res.send('<script>alert("An Internal Server error!");</script>');
                // }
                // // if(response.)

                // oauth.addMember({
                //     accessToken: response.access_token,
                //     guildId: `${guild.guildid}`,
                //     userId: req.user?.profile.id,
                //     botToken: `${process.env.BOT_TOKEN}`
                // }).then((err) => {
                //     if (err) {
                //         req.session.destroy();
                //         return res.send('<script>alert("An Internal Server error!");</script>');
                //     }

                //     req.session.destroy();
                //     res.status(200).send("Successfully joined the server!");
                // }).catch((err) => {
                //     res.status(500).send(err);
                //     console.log(err);
                // });
            }
        }
    });

}

bootstrap();

export default router;
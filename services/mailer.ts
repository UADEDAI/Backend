import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export async function sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
    );

    oauth2Client.setCredentials({
        'refresh_token': process.env.REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred', err);
        } else {
            console.log('Email sent', info);
        }
    });
}

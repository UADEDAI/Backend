import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export async function sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const oauth2Client = new OAuth2(
        '508787215655-p9n86k0eru4mr2v0lp3c1hhjh85p81j9.apps.googleusercontent.com', // Replace with your own
        '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', // Replace with your own
        'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
        'refresh_token': '1//040qhhSMXxeNWCgYIARAAGAQSNwF-L9IrO1cKGjjFanZJt2gnAGns6QEuEJjDrS1Xod2IhgQhnstS_q5vNFOvrAyotXzViaWybvg' // Replace with your own
    });

    const accessToken = oauth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'cinemappdai@gmail.com', // Replace with your email
            clientId: '508787215655-p9n86k0eru4mr2v0lp3c1hhjh85p81j9.apps.googleusercontent.com', // Replace with your own
            clientSecret: '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', // Replace with your own
            refreshToken: '1//040qhhSMXxeNWCgYIARAAGAQSNwF-L9IrO1cKGjjFanZJt2gnAGns6QEuEJjDrS1Xod2IhgQhnstS_q5vNFOvrAyotXzViaWybvg', // Replace with your own
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: 'cinemappdai@gmail.com', // sender address
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


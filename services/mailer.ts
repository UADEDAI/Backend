import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export async function sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const oauth2Client = new OAuth2(
        '508787215655-bo6hijbstqo80rnp3pic7mosrhoc2g2u.apps.googleusercontent.com', // Replace with your own
        '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', // Replace with your own
        'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
        'refresh_token': '1//0h1gUtgWZmk4FCgYIARAAGBESNwF-L9IrrlTPUBRaRZ5LzOL-iNuiM1Gn2Rauki0kKcuXiRNQQmUn0HQbBnjJJnsDobx2XnPVKhI' // Replace with your own
    });

    const accessToken = oauth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'YOUR_EMAIL', // Replace with your email
            clientId: '508787215655-bo6hijbstqo80rnp3pic7mosrhoc2g2u.apps.googleusercontent.com', // Replace with your own
            clientSecret: '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', // Replace with your own
            refreshToken: '1//0h1gUtgWZmk4FCgYIARAAGBESNwF-L9IrrlTPUBRaRZ5LzOL-iNuiM1Gn2Rauki0kKcuXiRNQQmUn0HQbBnjJJnsDobx2XnPVKhI', // Replace with your own
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


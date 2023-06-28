import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export async function sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const oauth2Client = new OAuth2(
        '528611451211-e4jm249pt2jpic47d3agt0hj62pkgnbb.apps.googleusercontent.com', // Replace with your own
        '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', // Replace with your own
        'https://developers.google.com/oauthplayground' // Redirect URL
    );

    oauth2Client.setCredentials({
        'refresh_token': '1//04jCqe2tY4uuKCgYIARAAGAQSNwF-L9IrRK1P9CfnjCK9BceBkotjBFvlD0onDye_y8OXhDdA2AzPIyh6JYBxjc_97-rci-ZI6Kk' // Replace with your own
    });

    const accessToken = oauth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'cinemappdai@gmail.com', // Replace with your email
            clientId: '528611451211-e4jm249pt2jpic47d3agt0hj62pkgnbb.apps.googleusercontent.com', // Replace with your own
            clientSecret: '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', // Replace with your own
            refreshToken: '1//04jCqe2tY4uuKCgYIARAAGAQSNwF-L9IrRK1P9CfnjCK9BceBkotjBFvlD0onDye_y8OXhDdA2AzPIyh6JYBxjc_97-rci-ZI6Kk', // Replace with your own
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
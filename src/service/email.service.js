import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configura tu cuenta de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export const sendPurchaseEmail = async (user, ticket) => {
    const { code, totalAmount, products } = ticket;
    const productList = products.map(p => `- ${p.productId.title}: ${p.quantity} x ${p.productId.price} = ${p.quantity * p.productId.price}`).join('\n');
    
    const mailOptions = {
        from: 'francomostajo@gmail.com',
        to: user.email,
        subject: 'Compra realizada con éxito',
        text: `
            ¡Gracias por tu compra, ${user.first_name} ${user.last_name}!

            Código de compra: ${code}
            Productos:
            ${productList}
            Monto total: $${totalAmount}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar correo:', error);
    }
};
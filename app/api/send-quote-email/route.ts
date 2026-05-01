import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, colorName, carType, totalPrice } = body;

    // Send email to business
    try {
      await resend.emails.send({
        from: 'Millan Auto Customs <onboarding@resend.dev>', // Replace with your verified domain
        to: 'millanautocustoms@icloud.com',
        subject: `New Quote Request from ${name}`,
        html: `
          <h2>New Car Wrap Quote Request</h2>
          
          <h3>Customer Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
          
          <h3>Quote Details:</h3>
          <ul>
            <li><strong>Wrap Color:</strong> ${colorName}</li>
            <li><strong>Vehicle Type:</strong> ${carType}</li>
            <li><strong>Total Price:</strong> KSh ${totalPrice?.toLocaleString()}</li>
          </ul>
          
          <h3>Additional Notes:</h3>
          <p>${message || 'No additional notes provided'}</p>
          
          <p><em>Please follow up with this customer within 24 hours.</em></p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending business email:', emailError);
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: 'Millan Auto Customs <onboarding@resend.dev>', // Replace with your verified domain
        to: email,
        subject: 'Your Car Wrap Quote Request Confirmation',
        html: `
          <h2>Thank you for your interest in our car wrap services!</h2>
          
          <p>Dear ${name},</p>
          
          <p>We have received your quote request with the following details:</p>
          
          <ul>
            <li><strong>Wrap Color:</strong> ${colorName}</li>
            <li><strong>Vehicle Type:</strong> ${carType}</li>
            <li><strong>Estimated Price:</strong> KSh ${totalPrice?.toLocaleString()}</li>
          </ul>
          
          <p>Our team will review your request and get back to you within 24 hours with a detailed quote and next steps.</p>
          
          <h3>Contact Us:</h3>
          <ul>
            <li><strong>Phone:</strong> 0795557083</li>
            <li><strong>Email:</strong> millanautocustoms@icloud.com</li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Millan Auto Customs Team</strong></p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending customer email:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Quote submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing quote email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}

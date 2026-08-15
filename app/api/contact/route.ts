import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple input sanitization function to prevent XSS/HTML injection
function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPhone = phone && typeof phone === 'string' && phone.trim() !== '' 
      ? sanitizeInput(phone.trim()) 
      : 'Not provided';
    const sanitizedMessage = sanitizeInput(message.trim());

    // 2. Environment Configuration
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'skillverse0109@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    if (!apiKey) {
      const errorMsg = 'RESEND_API_KEY is not defined in environment variables';
      console.error("CONTACT FORM ERROR:", new Error(errorMsg));
      return NextResponse.json(
        { success: false, message: 'Unable to send message due to missing configuration' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    // Formatting date/time for UTC and a local readable format
    const submissionDate = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long' 
    });

    const emailText = `New contact form submission from the Zenlio website.

Name:
${sanitizedName}

Email:
${sanitizedEmail}

Phone:
${sanitizedPhone}

Message:
${sanitizedMessage}

Submitted:
${submissionDate}`;

    // 3. Send Email
    const response = await resend.emails.send({
      from: senderEmail,
      to: contactEmail,
      subject: 'New Contact Form Submission — Zenlio',
      text: emailText,
      replyTo: sanitizedEmail,
    });

    if (response.error) {
      console.error("CONTACT FORM ERROR:", response.error);
      return NextResponse.json(
        { success: false, message: 'Unable to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (err) {
    console.error("CONTACT FORM ERROR:", err);
    return NextResponse.json(
      { success: false, message: 'Unable to send message' },
      { status: 500 }
    );
  }
}

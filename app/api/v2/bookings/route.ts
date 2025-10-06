import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { experience_id, customer_name, customer_email, preferred_date } = body;

    if (!experience_id || !customer_name || !customer_email || !preferred_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Forward the request to your Flask backend
    const flaskResponse = await fetch('https://creative-marketplace-seven.vercel.app/api/v2/booking-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experience_id,
        customer_name,
        customer_email,
        customer_phone: body.customer_phone || '',
        preferred_date,
        message: body.message || ''
      }),
    });

    if (!flaskResponse.ok) {
      throw new Error(`Flask API error: ${flaskResponse.status}`);
    }

    const result = await flaskResponse.json();

    return NextResponse.json({
      success: true,
      booking_id: result.id,
      message: 'Booking request sent successfully'
    });

  } catch (error) {
    console.error('Booking API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process booking request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
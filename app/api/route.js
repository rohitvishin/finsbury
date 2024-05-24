// app/api/hello/route.js

import { connectToDatabase } from '../../lib/mongodb';

export async function POST(request) {
    try {
      const { firstname, lastname, email } = await request.json();
  
      if (!firstname || !lastname || !email) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.warn('Invalid email format:', email); // Log invalid email format
        return new Response(JSON.stringify({ error: 'Invalid email format' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      const { db } = await connectToDatabase();
      const collection = db.collection('finsbury');
  
      const result = await collection.insertOne({ firstname, lastname, email });
  
      return new Response(JSON.stringify({ success: true, data: { id: result.insertedId } }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to submit form:', error); // Log the error for debugging
      return new Response(JSON.stringify({ error: 'Failed to submit form', details: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

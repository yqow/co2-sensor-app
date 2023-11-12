// import { NextResponse } from 'next/server';
// import NodeCache from 'node-cache';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// export const cache = new NodeCache();
export async function POST(req : any) {
  try {
    const querystring = require('querystring');
    const dataString = await req.text();
    const data = querystring.parse(dataString);
    const timestamp = new Date();
    timestamp.setTime(timestamp.getTime() + 8 * 60 * 60 * 1000);
    const timestampString = timestamp.toISOString().slice(0, 19).replace('T', ' ');
    const result = await sql`INSERT into SensorData (Co2, Temperature, Humidity, Timestamp) values (${data.co2}, ${data.temperature}, ${data.humidity}, ${timestampString});`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

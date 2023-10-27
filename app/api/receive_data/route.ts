// import { NextResponse } from 'next/server';
// import NodeCache from 'node-cache';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// export const cache = new NodeCache();
export async function POST(req : any) {
  // try {
  //   const querystring = require('querystring');
  //   const dataString = await req.text();
  //   // console.log('Data received:', dataString);
  //   const data = querystring.parse(dataString);
  //   // console.log(JSON.stringify(data)); // Convert to JSON string and log it
  //   cache.set('data', JSON.stringify(data));
  //   if (Object.keys(data).length !== 0) {
  //     // console.log('Data successfully POST-ed:', dataString);
  //     return NextResponse.json(data);
  //   } else {
  //     return NextResponse.json({ message: 'Data not sent' });
  //   }
  // } catch (err) {
  //   // TODO Handle the error
  //   return NextResponse.json({ message: 'Internal server error' });
  // }

  try {
    const querystring = require('querystring');
    const dataString = await req.text();
    // console.log('Data received:', dataString);
    const data = querystring.parse(dataString);
    // console.log(JSON.stringify(data)); // Convert to JSON string and log it
    const timestamp = new Date();
    timestamp.setTime(timestamp.getTime() + 8 * 60 * 60 * 1000);
    const timestampString = timestamp.toISOString().slice(0, 19).replace('T', ' ');
    // console.log(`${timestampString}`)
    const result = await sql`INSERT into SensorData (Co2, Temperature, Humidity, Timestamp) values (${data.co2}, ${data.temperature}, ${data.humidity}, ${timestampString});`;
    // console.log(`Received data: ${JSON.stringify(result)}` )
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    // console.log(`Received data: error = ${err}` )
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

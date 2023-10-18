import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';

export const cache = new NodeCache();
export async function POST(req : any) {
  try {
    const querystring = require('querystring');
    const dataString = await req.text();
    // console.log('Data received:', dataString);
    const data = querystring.parse(dataString);
    // console.log(JSON.stringify(data)); // Convert to JSON string and log it
    cache.set('data', JSON.stringify(data));
    if (Object.keys(data).length !== 0) {
      // console.log('Data successfully POST-ed:', dataString);
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ message: 'Data not sent' });
    }
  } catch (err) {
    // TODO Handle the error
    return NextResponse.json({ message: 'Internal server error' });
  }
}

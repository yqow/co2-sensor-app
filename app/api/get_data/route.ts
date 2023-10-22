import { cache } from '../receive_data/route';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  try {
    const dataString: any = cache.get('data'); // Get the original JSON data string from the cache
    if (dataString === null) {
      return NextResponse.json({ message: 'Data not available' });
    } else {
      console.log("Data string = ")
      console.log(dataString)
      console.log(typeof(dataString))
      const jsonData = JSON.parse(dataString); // Parse the JSON data string
      return NextResponse.json(jsonData); // Return the parsed JSON object
    }
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}

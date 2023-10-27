import { sql, db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  const client = await db.connect();
  try {
    
    // const data = await sql`SELECT Timestamp, Co2, Temperature, Humidity FROM SensorData ORDER BY Timestamp DESC LIMIT 1;`;
    const data = await client.sql`SELECT * FROM sensordata ORDER BY Timestamp DESC LIMIT 1;`;
    // const data = await sql`SELECT * FROM sensordata OFFSET ((SELECT count(*) from sensordata)-1);`
    // const data = await sql`SELECT * FROM sensordata ORDER BY Timestamp DESC`
    // console.log('All data:', data.rows)
    // console.log(`Number of rows: ${data.rowCount}`);
    const result = data.rows[0]
    console.log(result)
    // console.log(`Get data: ${JSON.stringify(result)}` )
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (err) {
    // console.log(`Get data: err = ${err}` )
    return NextResponse.json({ error: err }, { status: 400 })
  }
    finally {
      client.release()
    }
}


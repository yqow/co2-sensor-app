import { sql, db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { stringify } from 'querystring';


export async function GET(req: NextRequest, res: NextResponse) {
  const duration = req.nextUrl.searchParams.get("duration")
  const client = await db.connect();
  try {
    
    // const data = await sql`SELECT Timestamp, Co2, Temperature, Humidity FROM SensorData ORDER BY Timestamp DESC LIMIT 1;`;
    if (duration === null) {
      const data = await client.sql`SELECT * FROM sensordata ORDER BY Timestamp DESC LIMIT 1;`;
      // const data = await sql`SELECT * FROM sensordata OFFSET ((SELECT count(*) from sensordata)-1);`
      // const data = await sql`SELECT * FROM sensordata ORDER BY Timestamp DESC`
      // console.log('All data:', data.rows)
      // console.log(`Number of rows: ${data.rowCount}`);
      const result = data.rows[0]
      console.log(result)
      // console.log(stringify(result))
      // console.log(`Get data: ${JSON.stringify(result)}` )
      return NextResponse.json({ ...result }, { status: 200 });
    } else {
      console.log("Calling with duration = ", duration)
      const data = await client.sql`SELECT * 
              FROM sensordata 
              WHERE "timestamp" >= CURRENT_TIMESTAMP + (8 * interval '1 hour') - (${duration} * interval '1 second')
              ORDER BY "timestamp" ASC;`
      const res = data.rows
      const result = res.map((d) => {
        const t = new Date(d.timestamp);
        t.setTime(t.getTime() + 8 * 60 * 60 * 1000);
        return {...d, timestamp: t}

      } )
      return NextResponse.json({ result }, { status: 200 });
    }
    
  } catch (err) {
    // console.log(`Get data: err = ${err}` )
    return NextResponse.json({ error: err }, { status: 400 })
    }
    finally {
      client.release()
    }
}


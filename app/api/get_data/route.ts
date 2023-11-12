import { sql, db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { stringify } from 'querystring';


export async function GET(req: NextRequest, res: NextResponse) {
  const duration = req.nextUrl.searchParams.get("duration")
  const client = await db.connect();
  try {
    if (duration === null) {
      const data = await client.sql`SELECT * FROM sensordata ORDER BY Timestamp DESC LIMIT 1;`;
      const result = data.rows[0]
      return NextResponse.json({ ...result }, { status: 200 });
    } else {
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


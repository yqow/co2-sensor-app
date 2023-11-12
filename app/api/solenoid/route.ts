import { NextRequest, NextResponse } from "next/server";

const { spawn } = require('child_process')


export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Called ...")
    const pythonProcess = spawn('python', ['./app/api/actuate_solenoid.py']);

    pythonProcess.stdout.on('data', (data: any) => {
    console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data: any) => {
    console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', (code: any) => {
    console.log(`Python script exited with code ${code}`);
    });

    pythonProcess.on('error', (err: any) => {
    console.error(`Error spawning Python script: ${err}`);
    });
    console.log("End ...")
    return NextResponse.json({ result: "Successfully executed python script" }, { status: 200 });
}


import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET() {
	try {
		const filePath = path.join(process.cwd(), 'public', 'images', 'Resume-Ricardo-Zea.pdf');
		const stat = await fs.stat(filePath);
		const mb = stat.size / (1024 * 1024);
		return NextResponse.json(
			{ bytes: stat.size, mb: Number(mb.toFixed(2)) },
			{ headers: { 'Cache-Control': 'no-store' } }
		);
	} catch {
		return NextResponse.json({ error: 'Not found' }, { status: 404 });
	}
}

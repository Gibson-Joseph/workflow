import { GetChatMessage } from '@/actions/workflows/GetChatMessage';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('message', message);
    const res = await GetChatMessage(message);

    return Response.json({ response: res }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return Response.json({ error: 'internal server error' }, { status: 500 });
  }
}

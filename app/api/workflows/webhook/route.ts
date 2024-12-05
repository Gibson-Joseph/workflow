import { FindNode } from '@/actions/workflows/FindNode';
import { extractMessageData } from '@/lib/helper/meta';
import { NextResponse } from 'next/server';
// const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken!,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId!,
  WABA_ID: process.env.Meta_WA_wabaId!,
  graphAPIVersion: 'v21.0',
});

// Handle GET requests
export async function GET(req: Request) {
  try {
    console.log('GET: Someone is pinging me!');
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (
      mode &&
      token &&
      mode === 'subscribe' &&
      process.env.Meta_WA_VerifyToken === token
    ) {
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse(null, { status: 403 });
    }
  } catch (error) {
    console.error({ error });
    return new NextResponse(null, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  try {
    console.log('POST: Someone is pinging me!');
    const body = await req.json();
    console.log('BODY IS:', JSON.stringify(body, null, 4));

    const data = Whatsapp.parseMessage(body);

    console.log('DATA IS:', JSON.stringify(data, null, 4));

    if (data?.isMessage) {
      const messageData = extractMessageData(data);
      if (!messageData) return;
      const { messageType } = messageData;
      console.log('incomming messages', JSON.stringify(data, null, 4));

      console.log('***** type Of Msg *******', messageType);

      // Send the data to find the Executable node
      await FindNode(data, Whatsapp);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error({ error });
    return new NextResponse(null, { status: 500 });
  }
}

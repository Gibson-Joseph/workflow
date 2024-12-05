import { NextResponse } from 'next/server';
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');

const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
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

    console.log('WHATSAPP INSTANCE:', Whatsapp);

    const data = Whatsapp.parseMessage(body);
    console.log('DATA IS:', JSON.stringify(data, null, 4));

    if (data?.isMessage) {
      console.log('incomming messages', JSON.stringify(data, null, 4));

      const incomingMessage = data.message;
      const recipientPhone = incomingMessage.from.phone;
      const recipientName = incomingMessage.from.name;
      const typeOfMsg = incomingMessage.type;
      const message_id = incomingMessage.message_id;

      console.log('***** type Of Msg *******', typeOfMsg);

      if (typeOfMsg === 'text_message') {
        await Whatsapp.sendSimpleButtons({
          message: `Hey ${recipientName}, \nYou are speaking to a chatbot.\nWhat do you want to do next?`,
          recipientPhone,
          listOfButtons: [
            {
              title: 'View some products',
              id: 'see_categories',
            },
            {
              title: 'Speak to a human',
              id: 'speak_to_human',
            },
          ],
        });
      }

      // Add the rest of the message handling logic as in your Express code...

      // Ensure all button handlers are implemented here.
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error({ error });
    return new NextResponse(null, { status: 500 });
  }
}

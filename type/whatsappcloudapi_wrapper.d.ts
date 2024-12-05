// whatsappcloudapi_wrapper.d.ts
declare module 'whatsappcloudapi_wrapper' {
  interface WhatsappCloudAPIConfig {
    accessToken: string;
    senderPhoneNumberId: string;
    WABA_ID: string;
    graphAPIVersion?: string;
  }

  interface parseMessage {
    payload: any;
  }

  interface Button {
    title: string;
    id: string;
  }

  interface ButtonMessagePayload {
    recipientPhone: string;
    message: string;
    listOfButtons: Button[];
  }

  interface Image {
    recipientPhone: string;
    caption: string;
    file_path: string;
  }

  class WhatsappCloudAPI {
    constructor(config: WhatsappCloudAPIConfig);

    // Add methods as needed
    parseMessage(payload): any;
    sendSimpleButtons(payload: ButtonMessagePayload): any;
    sendImage(payload: Image): any;
  }

  export default WhatsappCloudAPI;
}

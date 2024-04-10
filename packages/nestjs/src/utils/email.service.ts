/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo';
import { IncomingMessage } from 'http';

export type EmailMsg = {
  subject: string;
  html: string;
  to: {
    email: string;
    name: string;
  };
  from: {
    email: string;
    name: string;
  };
};

export type ContactAttributes = {
  FIRSTNAME: string;
  NRS_ID: string;
  CREATED_AT: string;
  CHURNED: boolean;
  LAST_CHECKIN: string;
  TOTAL_CHECKINS: number;
};

export type NewContact = {
  email: string;
  extId: string;
  attributes: ContactAttributes;
};

export type UpdateContact = Omit<Partial<ContactAttributes>, 'CREATED_AT'>;
@Injectable()
export class EmailService {
  send(msg: EmailMsg) {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = msg.subject;
    sendSmtpEmail.htmlContent = msg.html;
    sendSmtpEmail.sender = msg.from;
    sendSmtpEmail.to = [msg.to];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log('API called successfully.');
      },
      function (error) {
        console.error(error);
      },
    );
  }

  async addContact(contact: NewContact): Promise<{
    response: IncomingMessage;
    body?: any;
  }> {
    const apiInstance = new brevo.ContactsApi();
    apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    return apiInstance.createContact(contact);
  }

  async updateContact(
    email: string,
    attributes: UpdateContact,
  ): Promise<{
    response: IncomingMessage;
    body?: any;
  }> {
    const apiInstance = new brevo.ContactsApi();
    apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    return apiInstance.updateContact(email, { attributes: attributes });
  }
}

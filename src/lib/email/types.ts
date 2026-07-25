/**
 * Email provider abstraction. Campaign/dashboard logic depends only on this
 * interface, so swapping Gmail for SES/Postmark/etc. is a single new file.
 */

export type OutgoingEmail = {
  from: string; // "Name <email@domain>" or bare address
  to: string;
  subject: string;
  html: string;
  text?: string;
  /** RFC822 Message-ID / thread to reply within, if continuing a thread. */
  inReplyTo?: string;
  threadId?: string;
};

export type SendResult = {
  providerMessageId: string;
  threadId?: string;
};

export interface EmailProvider {
  readonly name: string;
  send(message: OutgoingEmail): Promise<SendResult>;
}

import React from "react";

interface ContactEmailProps {
  senderEmail: string;
  message: string;
}

export default function ContactEmail({
  senderEmail,
  message,
}: Readonly<ContactEmailProps>) {
  return (
    <div>
      <h1>New Message from your contact form</h1>
      <p>
        You recieved a new message from <strong>{senderEmail} </strong>{" "}
      </p>
      <hr />
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  );
}

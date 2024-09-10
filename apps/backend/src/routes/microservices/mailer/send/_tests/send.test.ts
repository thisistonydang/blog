import { describe, expect, it } from "vitest";

import { sign_jwt } from "@lib/jwt/sign-jwt";
import { env } from "@lib/testing/env";

import api_route from "../index";

describe("/microservices/mailer/send", () => {
  it.each([
    // Valid payload.
    [
      "Sender <sender@example.com>",
      "Recipient <recipient@example.com>",
      "ReplyTo <replyto@example.com>",
      "Subject",
      "Text Body",
      "<h1>HTML Body</h1>",
      true,
      200,
      "Success: Email sent.",
    ],

    // Invalid payload.
    [0, 0, 0, 0, 0, 0, true, 400, "Invalid payload."],

    // Invalid JWT.
    [0, 0, 0, 0, 0, 0, false, 400, "Invalid JWT."],
  ])(
    `sender: %s, 
     recipient: %s, 
     replyTo: %s, 
     subject: %s, 
     textBody: %s, 
     htmlBody: %s, 
     isValidJwt: %s, 
     expectedStatus: %s, 
     expectedBody: %s
    `,
    async (
      sender,
      recipient,
      replyTo,
      subject,
      textBody,
      htmlBody,
      isValidJwt,
      expectedStatus,
      expectedBody,
    ) => {
      // GIVEN Payload and whether JWT is valid.

      // WHEN Request is made to api route with jwt.
      const jwt = await sign_jwt(env, { sender, recipient, replyTo, subject, textBody, htmlBody });
      const request = new Request("https://tonydang.blog/microservices/mailer/send", {
        method: "POST",
        body: JSON.stringify({ jwt: isValidJwt ? jwt : "invalid_jwt" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await api_route(request, env);

      // THEN Expected status code and body text is returned in response.
      expect(res.status).to.equal(expectedStatus);
      expect(await res.text()).to.equal(expectedBody);
    },
  );
});

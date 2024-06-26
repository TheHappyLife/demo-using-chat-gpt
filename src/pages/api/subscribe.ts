import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (Math.random() > 0.3) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }

    // Add your email subscription logic here
    // For example, save the email to a database or send it to an email service
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

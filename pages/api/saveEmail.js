// pages/api/save-email.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const savedEmail = await prisma.email.create({
        data: {
          address: email,
        },
      });

      res.status(200).json(savedEmail);
    } catch (error) {
      console.error('Error saving email:', error);
      res.status(500).json({ error: 'Failed to save email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

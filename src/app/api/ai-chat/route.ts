import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are PulseTix AI, a friendly and helpful assistant for PulseTix — NYC's premier nightlife and events ticketing platform.

Your role:
- Help users find events, answer questions about tickets, and provide info about the platform
- Be enthusiastic about NYC nightlife and events
- Keep responses concise (2-3 sentences max)
- If asked about specific events, mention that users can browse all events at /events
- For ticket issues, direct them to Pulsetixai@gmail.com
- You can help with: event recommendations, ticket questions, how QR codes work, promoter program info

Platform info:
- Tickets are delivered instantly via email with QR codes
- QR codes are scanned at the door for entry
- Promoters earn commission on ticket sales through referral links
- Events span nightlife, music, fitness, food, art, comedy, and social connections
- Based in NYC: Manhattan, Brooklyn, Queens`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      // Fallback response when API key isn't set
      return NextResponse.json({
        reply: "Hi! I'm PulseTix AI. I'm not fully connected yet, but check out /events to browse upcoming events, or email Pulsetixai@gmail.com for help!",
      });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "Sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json({
      reply: "Sorry, I'm having trouble right now. Try again in a moment, or email Pulsetixai@gmail.com for help!",
    });
  }
}

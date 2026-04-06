import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // TODO: When ANTHROPIC_API_KEY is configured:
    // const anthropic = new Anthropic();
    // const response = await anthropic.messages.create({
    //   model: "claude-sonnet-4-6",
    //   max_tokens: 500,
    //   system: "You are PulseTix AI, a helpful assistant for an NYC nightlife events platform...",
    //   messages: [{ role: "user", content: message }],
    // });

    return NextResponse.json({
      reply: "Hi! I'm PulseTix AI. I'm not fully connected yet, but I'll be able to help you find events, answer ticket questions, and more once the API key is configured.",
    });
  } catch {
    return NextResponse.json({ error: "AI service unavailable" }, { status: 500 });
  }
}

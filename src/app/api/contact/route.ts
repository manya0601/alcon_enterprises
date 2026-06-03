import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, company, message } = body;

    // Validate required fields
    if (!fullName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Simulate network delay and backend processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("=== New Contact Message ===");
    console.log(`From: ${fullName} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Company: ${company || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("===========================");

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

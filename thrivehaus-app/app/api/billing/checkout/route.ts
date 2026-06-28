import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { familyId } = await req.json();

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 2900, // $29.00
          product_data: {
            name: "ThriveHaus Family Blueprint",
            description: "Your personalized, AI-generated family support blueprint — yours to keep and revisit anytime.",
            images: [],
          },
        },
        quantity: 1,
      },
    ],
    metadata: { familyId, userId: user.id },
    success_url: `${origin}/dashboard/blueprint?unlocked=1`,
    cancel_url:  `${origin}/dashboard/blueprint`,
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}

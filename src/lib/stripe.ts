import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Lazy-load Stripe (only initializes when first accessed)
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    if (!_stripe) _stripe = getStripeClient();
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop];
  },
});

import Stripe from "stripe";
import { Product } from "@/types";

export function mapProductsToStripeLineItems(items: Array<{ product: Product; quantity: number }>): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return items.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
        metadata: {
          slug: product.slug,
          sku: product.technical.sku
        }
      },
      unit_amount: Math.round(product.price * 100)
    }
  }));
}

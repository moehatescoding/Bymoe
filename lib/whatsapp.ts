const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918919377794";

export interface CartItemForMessage {
  name: string;
  quantity: number;
  price: number;
}

export function generateOrderMessage(items: CartItemForMessage[]): string {
  const lines = items
    .map((item) => `- ${item.name} x${item.quantity} – ₹${(item.price * item.quantity).toLocaleString("en-IN")}`)
    .join("\n");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `Hi, I want to order from bymoe:

${lines}

Total: ₹${total.toLocaleString("en-IN")}

Name:
Address:
Pincode:
Payment: COD / UPI`;
}

export function generateSingleOrderMessage(name: string, price: number, qty: number): string {
  return `Hi, I want to order from bymoe:

- ${name} x${qty} – ₹${(price * qty).toLocaleString("en-IN")}

Total: ₹${(price * qty).toLocaleString("en-IN")}

Name:
Address:
Pincode:
Payment: COD / UPI`;
}

export function generateBulkMessage(): string {
  return `Hi bymoe, I would like to enquire about a Bulk Order. 

I am interested in sourcing products for my business/project. Here are my preliminary details:

- Business/Client Name:
- Project Type (Office/Cafe/Retail/etc.):
- Estimated Quantity:
- Target Product List:
- Delivery Location:

Looking forward to your best quote. Thank you!`;
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getOrderWhatsAppUrl(items: CartItemForMessage[]): string {
  return getWhatsAppUrl(generateOrderMessage(items));
}

export function getSingleOrderUrl(name: string, price: number, qty: number): string {
  return getWhatsAppUrl(generateSingleOrderMessage(name, price, qty));
}

export function getBulkWhatsAppUrl(): string {
  return getWhatsAppUrl(generateBulkMessage());
}

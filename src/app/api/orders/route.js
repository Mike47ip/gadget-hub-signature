import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * POST /api/orders — place an order
 * Body: { firstName, lastName, email, address, city, zip, items: [{id, quantity, price}] }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, address, city, zip, items } = body;

    if (!firstName || !lastName || !email || !address || !city || !zip || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        zip,
        total,
        status: "confirmed",
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    // Decrement stock for each product
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

/**
 * GET /api/orders — list orders (admin use)
 */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

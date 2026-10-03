import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/products/[id]
 */
export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("[GET /api/products/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

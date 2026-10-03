import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/products
 * Query params: category, sale, search, sortBy
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const sale = searchParams.get("sale");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";

    const where = {};
    if (category && category !== "all") where.category = category;
    if (sale === "true") where.isOnSale = true;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const orderBy = {
      savings: { price: "asc" },
      "price-asc": { price: "asc" },
      "price-desc": { price: "desc" },
      rating: { rating: "desc" },
      newest: { createdAt: "desc" },
    }[sortBy] || { createdAt: "desc" };

    const products = await prisma.product.findMany({ where, orderBy });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/**
 * POST /api/products
 * Create a product (admin use)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

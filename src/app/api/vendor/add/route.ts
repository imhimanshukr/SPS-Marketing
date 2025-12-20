import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { vendorName, productList = [], logo } = await req.json();

    if (!vendorName) {
      return NextResponse.json(
        { message: "vendorName is required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.create({
      userId: session.user.id,
      vendorName,
      productList,
      logo,
      orderList: [],
    });

    return NextResponse.json({ vendor }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Add vendor failed", error: error.message },
      { status: 500 }
    );
  }
}

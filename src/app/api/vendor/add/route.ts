import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { vendorName, productList, logo } = await req.json();
    const vendordata = await Vendor.create({
      vendorName,
      productList,
      logo,
    });
    return NextResponse.json(vendordata, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: `add vendor error ${error}` });
  }
}

import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId, vendorName, productList, logo } = await req.json();

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId is required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 }
      );
    }

    // ✅ Update only provided fields
    if (vendorName !== undefined) vendor.vendorName = vendorName;
    if (logo !== undefined) vendor.logo = logo;
    if (Array.isArray(productList)) vendor.productList = productList;

    await vendor.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Vendor updated successfully", vendor },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update vendor failed", error: error.message },
      { status: 500 }
    );
  }
}

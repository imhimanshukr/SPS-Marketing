import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId } = await req.json();

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId is required" },
        { status: 400 }
      );
    }

    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Vendor deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Delete vendor failed", error: error.message },
      { status: 500 }
    );
  }
}

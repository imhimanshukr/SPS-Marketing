import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { vendorId, orderId } = await req.json();

    if (!vendorId || !orderId) {
      return NextResponse.json(
        { message: "vendorId and orderId required" },
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

    vendor.orderList = vendor.orderList.filter(
      (g: any) => String(g.orderId) !== String(orderId)
    );

    await vendor.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Delete order failed", error },
      { status: 500 }
    );
  }
}

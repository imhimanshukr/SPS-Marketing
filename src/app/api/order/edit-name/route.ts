import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId, orderId, orderName } = await req.json();

    if (!vendorId || !orderId || !orderName) {
      return NextResponse.json(
        { message: "vendorId, orderId, orderName required" },
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

    const order = vendor.orderList.find(
      (o: any) => String(o.orderId) === String(orderId)
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    order.orderListName = orderName;

    await vendor.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Order name changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Edit name failed", error },
      { status: 500 }
    );
  }
}

// app/api/order-row/update/route.ts
import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId, orderId, rowId, data } = await req.json();

    const vendor = await Vendor.findOneAndUpdate(
      {
        _id: vendorId,
        "orderList.orderId": orderId,
        "orderList.accordian._id": rowId,
      },
      {
        $set: {
          "orderList.$[o].accordian.$[r]": data,
        },
      },
      {
        arrayFilters: [{ "o.orderId": orderId }, { "r._id": rowId }],
        new: true,
      }
    );

    return NextResponse.json(
      { message: "Order row updated", vendor },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Update row failed", err },
      { status: 500 }
    );
  }
}

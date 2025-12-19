import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId, orderId, row } = await req.json();

    // ✅ STEP 1: Update current empty row → saved
    await Vendor.updateOne(
      {
        _id: vendorId,
        "orderList.orderId": orderId,
        "orderList.accordian._id": row._id,
      },
      {
        $set: {
          "orderList.$[o].accordian.$[r].orderedProductName":
            row.orderedProductName,
          "orderList.$[o].accordian.$[r].orderQty": row.orderQty,
          "orderList.$[o].accordian.$[r].stock": row.stock,
          "orderList.$[o].accordian.$[r].isEditable": false,
          "orderList.$[o].accordian.$[r].isNewRow": false,
        },
      },
      {
        arrayFilters: [{ "o.orderId": orderId }, { "r._id": row._id }],
      }
    );

    // ✅ STEP 2: Push new empty row
    const vendor = await Vendor.findOneAndUpdate(
      { _id: vendorId, "orderList.orderId": orderId },
      {
        $push: {
          "orderList.$.accordian": {
            orderedProductName: "",
            orderQty: "",
            stock: "",
            isEditable: true,
            isNewRow: true,
          },
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Order Row saved", vendor },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Add row failed", error },
      { status: 500 }
    );
  }
}

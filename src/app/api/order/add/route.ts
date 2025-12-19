import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { _id } = await req.json();

    const vendor = await Vendor.findById(_id);
    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 }
      );
    }

    const newOrderGroup = {
      orderListName: vendor.vendorName,
      accordian: [
        {
          sno: 1,
          orderedProductName: "",
          orderQty: "",
          stock: "",
          isEditable: true,
          isNewRow: true,
        },
      ],
    };

    vendor.orderList.push(newOrderGroup);
    await vendor.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Add order failed", error },
      { status: 500 }
    );
  }
}

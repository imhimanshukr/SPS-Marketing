import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { vendorId, orderId, rows } = await req.json();

    if (!vendorId || !orderId || !Array.isArray(rows)) {
      return NextResponse.json(
        { message: "vendorId, orderId, rows required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.findOne({
      _id: vendorId,
      userId: session.user.id,
    });

    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const order = vendor.orderList.find(
      (o: any) => String(o.orderId) === String(orderId)
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // 🔑 map for fast lookup
    const rowMap = new Map<string, any>();
    order.accordian.forEach((r: any) => {
      rowMap.set(String(r._id), r);
    });

    // ✅ SAFE reorder
    const reorderedAccordian = [];

    for (let i = 0; i < rows.length; i++) {
      const rowId = String(rows[i].rowId);
      const originalRow = rowMap.get(rowId);

      if (!originalRow) continue; // TS + runtime safety

      reorderedAccordian.push({
        ...originalRow,
        sno: i + 1,
      });
    }

    // 🧩 keep new row at end
    const newRow = order.accordian.find((r: any) => r.isNewRow);
    if (newRow) {
      reorderedAccordian.push({
        ...newRow,
        sno: reorderedAccordian.length + 1,
      });
    }

    order.accordian = reorderedAccordian;
    await vendor.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Order reordered successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("REORDER ERROR 👉", error);
    return NextResponse.json(
      { message: "Reorder failed", error: error.message },
      { status: 500 }
    );
  }
}

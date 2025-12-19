import mongoose from "mongoose";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { vendorId, orderId, rowIds } = await req.json();
    if (!vendorId || !orderId || !rowIds.length) {
      return NextResponse.json({ message: "Invaid payoad" }, { status: 400 });
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 400 }
      );
    }

    const originalOrder = vendor.orderList.find(
      (o: any) => String(o.orderId) === String(orderId)
    );

    if (!originalOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // 🔹 filter only selected rows
    const selectedRows = originalOrder.accordian.filter((row: any) =>
      rowIds.includes(String(row._id))
    );

    const newOrderId = new mongoose.Types.ObjectId();
    const newAccordian = selectedRows.map((row: any, index: number) => ({
      sno: index + 1,
      orderedProductName: row.orderedProductName,
      orderQty: row.orderQty,
      stock: row.stock,
      isEditable: false,
      isNewRow: false,
    }));

    newAccordian.push({
      sno: newAccordian.length + 1,
      orderedProductName: "",
      orderQty: "",
      stock: "",
      isEditable: true,
      isNewRow: true,
    });

    vendor.orderList.push({
      orderId: newOrderId,
      orderListName: `${originalOrder.orderListName}(Copy)`,
      accordian: newAccordian,
    });

    await vendor.save({ validateBeforeSave: false });
    return NextResponse.json(
      { message: "Selected rows copied", orderId: newOrderId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "copy selected failed", error },
      { status: 500 }
    );
  }
}

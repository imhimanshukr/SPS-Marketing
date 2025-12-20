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

    const { vendorId, vendorName, productList, logo } = await req.json();

    if (!vendorId) {
      return NextResponse.json(
        { message: "vendorId is required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.findOne({
      _id: vendorId,
      userId: session.user.id,
    });

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 }
      );
    }

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

import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await connectDB();

    await Vendor.deleteMany({});

    return NextResponse.json(
      { message: "All vendors deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Delete all vendors failed", error },
      { status: 500 }
    );
  }
}

import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function DELETE() {
  try {
    await connectDB();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await Vendor.deleteMany({ userId: session.user.id });

    return NextResponse.json(
      { message: "All vendors deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Delete all vendors failed", error: error.message },
      { status: 500 }
    );
  }
}

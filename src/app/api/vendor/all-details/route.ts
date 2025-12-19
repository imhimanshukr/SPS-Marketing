import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    // If _id present → single vendor
    if (_id) {
      const vendor = await Vendor.findById(_id);

      if (!vendor) {
        return NextResponse.json(
          { message: "Vendor not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ vendor }, { status: 200 });
    }

    // If _id not present → all vendors
    const vendors = await Vendor.find();

    return NextResponse.json({ vendors }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Get Vendor Data Error: ${error}` },
      { status: 500 }
    );
  }
}

import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    try {
        const {_id} = await req.json();
        const vendor = await Vendor.findById(_id);
        if(!vendor){
            NextResponse.json(
                {message: 'Vendor not found'},
                {status: 404}
            );
        };

        vendor.orderList = [];

        await vendor.save({validateBeforeSave: false});

        return NextResponse.json(
            {message: 'All orders deleted successfully'},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: 'delete all failed', error},
            {status: 500}
        )
    }
}
import mongoose from "mongoose";

interface IOrderRow {
  sno: number;
  orderedProductName: string;
  orderQty?: string;
  stock?: string;
  isEditable: boolean;
  isNewRow: boolean;
}

interface IOrderGroup {
  orderId: string;
  orderListName: string;
  accordian: IOrderRow[];
}

interface IVendor {
  vendorName: string;
  logo?: string;
  productList: string[];
  orderList: IOrderGroup[];
}

const orderRowSchema = new mongoose.Schema<IOrderRow>({
  sno: { type: Number, required: true },
  orderedProductName: {
    type: String,
    default: "",
  },
  orderQty: {
    type: String,
    default: "",
  },
  stock: {
    type: String,
    default: "",
  },
  isEditable: {
    type: Boolean,
    default: true,
  },
  isNewRow: {
    type: Boolean,
    default: true,
  },
});

const orderGroupSchema = new mongoose.Schema<IOrderGroup>({
  orderId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  orderListName: {
    type: String,
    required: true,
  },
  accordian: {
    type: [orderRowSchema],
    default: [],
  },
});

const vendorSchema = new mongoose.Schema<IVendor>(
  {
    vendorName: { type: String, required: true, trim: true },
    logo: String,
    productList: [{ type: String, trim: true }],
    orderList: {
      type: [orderGroupSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default Vendor;

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import VendorList from "./VendorList";
import OrderList from "./OrderList";
import axios from "axios";
import Loader from "./mini-component/Loader";

export default function VendorWrapper() {
  const searchParams = useSearchParams();
  const vendorIdFromUrl = searchParams.get("vendorId");

  const [vendors, setVendors] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);

  /** 🔄 GLOBAL REFRESH FUNCTION */
  const refreshVendors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/vendor/all-details");
      setVendors(res.data.vendors);
      return res.data.vendors;
    } catch (err) {
      console.error("Refresh vendors failed", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedVendor = useMemo(() => {
    if (!vendorIdFromUrl || !vendors?.length) return null;
    return vendors.find((v: any) => v._id === vendorIdFromUrl) || null;
  }, [vendors, vendorIdFromUrl]);

  const filteredVendors = useMemo(() => {
    if (!vendors?.length) return [];
    if (!searchVal) return vendors;

    return vendors.filter((vendor: any) =>
      vendor.vendorName.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [vendors, searchVal]);

  useEffect(() => {
    refreshVendors();
  }, []);

  return (
    <>
      {/* 🔥 GLOBAL LOADER */}
      <Loader open={loading} />

      <Navbar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        refreshVendors={refreshVendors}
      />

      {selectedVendor ? (
        <OrderList
          vendor={selectedVendor}
          refreshVendors={refreshVendors}
          goBack={() => {
            window.history.pushState({}, "", "/");
          }}
        />
      ) : (
        <VendorList
          vendorsData={filteredVendors}
          refreshVendors={refreshVendors}
        />
      )}
    </>
  );
}

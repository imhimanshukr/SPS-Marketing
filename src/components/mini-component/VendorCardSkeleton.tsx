"use client";

import { Card, Box, Skeleton } from "@mui/material";

export default function VendorCardSkeleton() {
  return (
    <Card
      sx={{
        height: { xs: 108, md: 140 },
        borderRadius: "16px",
        px: { xs: 1, md: 1.5 },
        py: { xs: 1, md: 1.5 },
        boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
      }}
    >
      {/* Top Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="rounded" width={48} height={48} />
        <Skeleton width={28} height={20} />
      </Box>

      {/* Vendor Name */}
      <Box sx={{ mt: 2 }}>
        <Skeleton height={18} width="80%" sx={{ mx: "auto" }} />
        <Skeleton height={14} width="60%" sx={{ mx: "auto", mt: 0.5 }} />
      </Box>
    </Card>
  );
}

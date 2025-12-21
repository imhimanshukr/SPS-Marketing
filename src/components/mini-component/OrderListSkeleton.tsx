"use client";

import { Box, Skeleton } from "@mui/material";

export default function OrderListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, mt: 1 }}>
      {/* Sticky Header Skeleton */}
      <Box
        sx={{
          position: "sticky",
          top: { md: "38px", xs: "34px" },
          zIndex: 1100,
          backgroundColor: "#fff",
          pb: 1,
          mb: 1.5,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            mb: 1,
          }}
        >
          <Skeleton variant="rounded" width={40} height={30} />
          <Skeleton variant="rounded" width={130} height={30} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton variant="rounded" width={56} height={56} />
          <Skeleton width={120} height={28} />
        </Box>
      </Box>

      {/* Accordion Skeletons */}
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            mb: 1.5,
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          }}
        >
          {/* Accordion Header */}
          <Skeleton variant="rectangular" height={52} />

          {/* Accordion Body */}
          <Box sx={{ p: 1 }}>
            <Skeleton height={32} sx={{ mb: 1 }} />
            <Skeleton height={32} sx={{ mb: 1 }} />
            <Skeleton height={32} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

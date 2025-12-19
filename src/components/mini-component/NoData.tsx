"use client";

import { Box, Typography } from "@mui/material";
import { Frown } from "lucide-react";

interface NoDataProps {
  title: string;
}

const NoData = ({ title }: NoDataProps) => {
  return (
    <Box
      sx={{
        mt: 6,
        py: 5,
        px: 2,
        borderRadius: "16px",
        backgroundColor: "#fafafa",
        border: "1px dashed #e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#fdecea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Frown color="red" />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: 15, sm: 17 },
          fontWeight: 700,
          color: "#616161",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default NoData;

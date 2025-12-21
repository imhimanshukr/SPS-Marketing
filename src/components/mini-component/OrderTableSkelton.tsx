"use client";

import { Skeleton, TableRow, TableCell } from "@mui/material";

interface Props {
  rows?: number;
}

export default function OrderTableSkeleton({ rows = 5 }: Props) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          <TableCell align="center">
            <Skeleton width={20} />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" height={36} />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" height={36} />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" height={36} />
          </TableCell>

          <TableCell align="center">
            <Skeleton variant="circular" width={28} height={28} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

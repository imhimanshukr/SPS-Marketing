"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  description = "Do you want this action?",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent) => {
          e.preventDefault();
          onConfirm();
        },
        sx: {
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        },
      }}
    >
      <DialogTitle sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningAmberIcon sx={{ color: "#c62828" }} />
            <Typography sx={{ color: "#c62828" }} fontWeight={700}>
              {title}
            </Typography>
          </Box>

          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 2, pb: 1 }}>
        <Typography sx={{ color: "#c62828" }}>{description}</Typography>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onClose}
          sx={{ borderRadius: "10px" }}
        >
          {cancelText}
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          autoFocus
          sx={{
            borderRadius: "10px",
            backgroundColor: "#c62828",
            "&:hover": { backgroundColor: "#8f1212" },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

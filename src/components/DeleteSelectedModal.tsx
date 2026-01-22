"use client";

import { AlertTriangle, Loader2, Trash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface RemoveModalProps {
  onDelete: () => void;
  selectedIds: string[];
  deleteLoading: boolean;
}

const DeleteSelectedModal = ({
  onDelete,
  selectedIds,
  deleteLoading,
}: RemoveModalProps) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const onClose = () => {
    setOpenRemoveModal(false);
  };

  const handleDelete = () => {
    onClose();
    onDelete();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpenRemoveModal(true)}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete Selected ({selectedIds.length})
      </Button>
      <Dialog open={openRemoveModal} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>

              <div>
                <DialogTitle className="text-base font-semibold text-gray-900">
                  Delete {selectedIds.length} Selected Items
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete the selected items? This
                  action cannot be undone.
                </p>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteSelectedModal;

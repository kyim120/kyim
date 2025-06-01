
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string;
  itemName: string;
}

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, itemType, itemName }: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-red-600/30 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600/20 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
            </div>
            <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              Are you sure you want to delete this {itemType}?
            </p>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <p className="text-white font-medium truncate">"{itemName}"</p>
            </div>
            <p className="text-red-400 text-sm mt-3">
              ⚠️ This action cannot be undone.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={onClose} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Delete {itemType}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

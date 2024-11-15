import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

type Props = {
  deleteId: (id: string) => void;
  id: string;
  isOpen: boolean;
  setIsOpen: (value: any) => void;
};

function DeleteConfirmation({id,deleteId,isOpen,setIsOpen}:Props) {

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(null)}
        className="relative z-99999 "
      >
        <div className="fixed  inset-0 flex w-screen items-center justify-center bg-black bg-opacity-30 p-4 backdrop-blur-sm">
          <DialogPanel className="max-w-lg space-y-4 rounded-xl border bg-white p-12 text-black dark:bg-dark-3 dark:text-white">
            <DialogTitle className="mb-6 text-center text-2xl font-bold ">
              Confirm Deletion
            </DialogTitle>
            <p>Are you sure you want to Delete?</p>

            <div className="flex justify-evenly gap-4">
              <button
                onClick={() => setIsOpen(null)}
                className="rounded-lg bg-blue-400 px-3 py-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteId(id);
                  setIsOpen(null);
                }}
                className="rounded-lg bg-blue-400 px-3 py-1"
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
    </>
  );
}

export default DeleteConfirmation;

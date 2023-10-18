"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { deleteResultById } from "@/lib/actions/result.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { useState } from "react";

interface Props {
  resultId: string;
}

function DeleteResult({ resultId }: Props) {
  const router = useRouter();

  const [adKey, setAdKey] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdKey(e.target.value);
  };

  const adminKey = process.env.NEXT_PUBLIC_ADKEY;

  const handleDelete = async () => {
    if (adKey === adminKey) {
      await toast.promise(deleteResultById(JSON.parse(resultId)), {
        pending: "Deleting Result...",
        success: "Result Deleted Successfully!",
        error: "Error deleting result. Please try again.",
      });

      router.push("/");
    } else {
      toast.error("Please enter valid key");
      setAdKey("");
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="rounded-full bg-gray-600 p-[2px] hover:bg-gray-600">
          <MdDeleteOutline className="w-6 h-6" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 transition-all duration-300" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[85vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-700 p-[25px] shadow-[0px_0px_15px_2px] shadow-teal-300">
          <AlertDialog.Title className=" m-0 text-[17px] font-medium flex items-center gap-2">
            Enter Admin Key <RiShieldKeyholeLine className="w-5 h-5" />
          </AlertDialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            <AlertDialog.Description className="text-slate-300 mt-4 mb-5 text-[15px] leading-normal">
              Enter admin key to delete this result.
              <input
                value={adKey}
                onChange={onChange}
                autoFocus
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                className="p-2 my-2 rounded-lg outline-none text-black w-full"
              />
            </AlertDialog.Description>
            <div className="flex justify-end gap-[25px] items-center">
              <AlertDialog.Cancel asChild>
                <button className=" hover:bg-slate-600 inline-flex h-[33px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none border border-white focus:shadow-[0_0_0_2px]">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className=" bg-teal-500 hover:bg-teal-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px]"
                >
                  Delete
                </button>
              </AlertDialog.Action>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteResult;

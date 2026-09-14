import React from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCreateClientsMutation } from "../../../store/api/app/Client/clientApiSlice";

const ClientCreateModal = ({ storeId, onClose, onCreated }) => {
  const [createClient, { isLoading }] = useCreateClientsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      photo: null,
    },
  });

  const onSubmit = async (data) => {
    const fd = new FormData();
    fd.append("store_id", storeId);
    fd.append("name", data.name);
    fd.append("phone", data.phone);
    if (data.email) fd.append("email", data.email);
    if (data.address) fd.append("address", data.address);
    if (data.photo?.[0]) fd.append("photo", data.photo[0]);

    try {
      await createClient(fd).unwrap();
      onCreated?.();
      onClose();
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        "Failed to create client";
      toast.error(String(msg));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-md rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Add Client</h3>
          <button
            type="button"
            className="p-2 rounded hover:bg-gray-100"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full border rounded p-2"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter phone"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              {...register("address")}
              className="w-full border rounded p-2"
              placeholder="Enter address"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              {...register("photo")}
              type="file"
              accept="image/*"
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreateModal;
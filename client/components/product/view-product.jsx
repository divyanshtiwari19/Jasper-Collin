"use client";
import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle } from "lucide-react";

// SWR fetcher function
const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProductDetailsDialog = ({ productId }) => {
  const [open, setOpen] = useState(false);

  const {
    data: product,
    error,
    isLoading,
    mutate,
  } = useSWR(open && productId ? `/api/products/${productId}` : null, fetcher);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) mutate();
      }}
    >
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Eye size={16} className="mr-2" /> View
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Product Details</DialogTitle>
        </DialogHeader>

        <div className="bg-blue-100 border-l-4 border-blue-300 text-blue-700 p-3 mb-2 flex items-start gap-2">
          <AlertTriangle size={20} className="text-yellow-600" />
          <p className="text-sm font-medium">
            This data is fetched dynamically from the backend via a single API
            call as per assignment.
          </p>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500">Failed to fetch product details</p>
        )}

        {product?.res && (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {product?.res?.name}
            </p>
            <p>
              <strong>Description:</strong> {product?.res?.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{product?.res?.price}
            </p>
            <p>
              <strong>Category:</strong> {product?.res?.category}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(product?.res?.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;

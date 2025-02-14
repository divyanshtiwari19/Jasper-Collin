"use client";
import React, { useState } from "react";
import TextInput from "@/common/form-inputs/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import TextareaInput from "@/common/form-inputs/text-area";
import { productSchema } from "@/schemas/product-schema";
import { createProduct, updateProduct } from "@/services/product-service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";

function ProductForm({ productValue = null, mode = "add", mutate }) { 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(productSchema),
    values: productValue
      ? { ...productValue, price: productValue?.price?.toString() }
      : {
          name: "",
          description: "",
          category: "",
          price: "",
        },
  });

  async function onSubmit(values) {
    try {
      const { data } = await (mode === "add"
        ? createProduct(values)
        : updateProduct(productValue?._id, values));

      mutate();
      toast.success(data?.message);
      setIsFormModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={16} className="mr-2" /> Add Product
          </Button>
        ) : (
          <Button variant="secondary" size="sm">
            <Pencil size={16} className="mr-2" /> Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-4"
          >
            <div className="grid grid-cols-1 gap-6">
              <div className="grid bg-white dark:bg-neutral-700 gap-2 ">
                <TextInput
                  name="name"
                  placeholder="Enter name."
                  label="Name"
                  control={form.control}
                />

                <TextareaInput
                  name="description"
                  type="textarea"
                  rows={4}
                  placeholder="Enter description."
                  label="Description"
                  control={form.control}
                />

                <TextInput
                  name="category"
                  placeholder="Enter category."
                  label="Category"
                  control={form.control}
                />

                <TextInput
                  name="price"
                  placeholder="Enter price."
                  label="Price"
                  control={form.control}
                />

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {mode === "add" ? "Add" : "Update"} Product
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductForm;

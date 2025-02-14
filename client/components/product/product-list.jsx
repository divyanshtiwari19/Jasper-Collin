import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, ChevronLeft, ChevronRight } from "lucide-react";
import ProductForm from "./product-form";
import ProductDetailsDialog from "./view-product";

function ProductList({
  products,
  handleDelete,
  setSearch,
  setCategory,
  setSort,
  setOrder,
  setPage,
  page,
  order,
  mutate,
}) {
  return (
    <div className="space-y-6">
      {/* Search & Filter Section */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64"
        />

        <Select onValueChange={(val) => setCategory(val === "all" ? "" : val)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Array.isArray(products?.categories) &&
              products?.categories?.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        >
          {order === "asc" ? "🔼 Ascending" : "🔽 Descending"}
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
        {Array.isArray(products?.res) &&
          products?.res?.map((product) => (
            <Card key={product._id} className="shadow-sm flex flex-col h-full">
              <CardHeader>
                <CardTitle>{product?.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>
                <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 mt-2 rounded text-xs">
                  {product.category}
                </span>
              </CardContent>
              <div className="p-4 text-sm text-gray-500 flex justify-between">
                <span className="text-gray-400">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
                <span className="font-semibold text-gray-900">
                  ₹ {product.price}
                </span>
              </div>
              <div className="flex gap-2 p-4 border-t">
              <ProductDetailsDialog productId={product._id} />

                <ProductForm productValue={product} mode="edit" mutate={mutate}  />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product._id)}
                >
                  <Trash size={16} className="mr-2" /> Delete
                </Button>
              </div>
            </Card>
          ))}
      </div>

      {/* Fixed Pagination */}
      <div className="fixed bottom-0 border-t-2 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={
            page === 1 ? "bg-gray-300 text-gray-600" : "bg-blue-600"
          }
        >
          <ChevronLeft size={18} /> Prev
        </Button>
        <span>Page {page}</span>
        <Button
          disabled={!products?.hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          className={
            !products?.hasNextPage
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-600"
          }
        >
          Next <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ProductList;

"use client";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import ProductForm from "@/components/product/product-form";
import ProductList from "@/components/product/product-list";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/product-service";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  // Construct API URL dynamically based on filters
  const queryParams = new URLSearchParams({
    page,
    limit: 8,
    ...(category && category !== "all" && { category }),
    ...(search && { search }),
    sort,
    order,
  }).toString();

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1); // Reset to first page
  };
  
  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1); // Reset to first page
  };  

  const { data: products, mutate } = useSWR(
    `/api/products?${queryParams}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  // To delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      mutate(); // Refresh the product list
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <ProductForm productValue={null} mode="add" mutate={mutate} />
      </div>

      <ProductList
        products={products}
        handleDelete={handleDelete}
        setSearch={handleSearch}
        setCategory={handleCategoryChange}
        setSort={setSort}
        setOrder={setOrder}
        setPage={setPage}
        page={page}
        order={order}
        mutate={mutate}
      />
    </div>
  );
};

export default Dashboard;

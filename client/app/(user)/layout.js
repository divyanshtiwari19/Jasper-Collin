import Navbar from "@/components/navigation-bar/navbar";

function layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  );
}

export default layout;

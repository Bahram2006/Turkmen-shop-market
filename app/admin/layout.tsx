import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export default async function AdminProducts() {
  // 1. Bazadan ähli harytlary iň täzesinden başlap çekýäris
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Haryt goşmak funksiýasy (Server Action)
  async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    await db.product.create({
      data: { name, price, category, description, image },
    });

    revalidatePath("/admin/products"); // Sahypany awtomatiki täzeleýär
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Harytlary Dolandyrmak</h1>

      {/* Haryt Goşmak Formasy */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Täze Haryt Goş</h2>
        <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Haryt ady" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="price" type="number" step="0.01" placeholder="Bahasy ($)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="category" placeholder="Kategoriýa (Elektronika, Geyim...)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="image" placeholder="Surat URL" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <textarea name="description" placeholder="Haryt barada giňişleýin maglumat..." className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2" rows={3} required />
          <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition md:col-span-2">
            Bazany Goş
          </button>
        </form>
      </div>

      {/* Harytlaryň Sanawy (Table) */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Ady</th>
              <th className="p-4 font-semibold text-gray-700">Kategoriýa</th>
              <th className="p-4 font-semibold text-gray-700">Bahasy</th>
              <th className="p-4 font-semibold text-gray-700">Senesi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-400">Entek haryt goşulmady...</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{p.name}</td>
                  <td className="p-4 text-gray-600">{p.category}</td>
                  <td className="p-4 font-bold text-blue-600">${p.price}</td>
                  <td className="p-4 text-sm text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

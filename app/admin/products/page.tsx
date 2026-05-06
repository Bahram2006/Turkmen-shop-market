import { db } from "../../../lib/db";
import { revalidatePath } from "next/cache";
import type { Product } from "@prisma/client";

/**
 * Harytlary dolandyrýan Admin sahypasy.
 * Bu sahypa maglumatlary hakyky wagtda bazadan çekýär we täze haryt goşmaga mümkinçilik berýär.
 */
export default async function AdminProducts() {
  // 1. Bazadan ähli harytlary iň täze goşulanyndan başlap çekýäris
  // 'Product[]' tipi arkaly TypeScript 'any' ýalňyşlygyny bermez
  const products: Product[] = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  /**
   * Täze haryt goşmak üçin Server Action funksiýasy.
   * Bu funksiýa gönüden-göni serwerde işleýär.
   */
  async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    // Maglumat bazasyna maglumatlary ýazýarys
    await db.product.create({
      data: {
        name,
        price,
        category,
        description,
        image,
      },
    });

    // Bazadaky üýtgeşmäni sahypada derrew görmek üçin revalidate edýäris
    revalidatePath("/admin/products");
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Sahypanyň Başlygy */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Harytlary Dolandyrmak
        </h1>
        <p className="text-gray-500">
          Dükandaky harytlaryň sanawyny dolandyryň we täze haryt goşuň.
        </p>
      </header>

      {/* Haryt Goşmak Formasy Bölümi */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Täze Haryt Goş</h2>
        <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Haryt Ady</label>
            <input 
              name="name" 
              placeholder="Mysal: iPhone 15 Pro" 
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Bahasy ($)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              placeholder="Mysal: 999.00" 
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Kategoriýa</label>
            <input 
              name="category" 
              placeholder="Mysal: Elektronika" 
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Surat URL</label>
            <input 
              name="image" 
              placeholder="https://images.com" 
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Haryt Düşündirişi</label>
            <textarea 
              name="description" 
              placeholder="Haryt barada giňişleýin maglumat ýazyň..." 
              className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              rows={4} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100"
          >
            Harydy Bazana Goş
          </button>
        </form>
      </section>

      {/* Haryt Sanawy Bölümi */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
          <h2 className="font-bold text-gray-800">Ähli Harytlar ({products.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="p-5 font-semibold">Haryt</th>
                <th className="p-5 font-semibold">Kategoriýa</th>
                <th className="p-5 font-semibold text-right">Baha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-16 text-center text-gray-400 italic">
                    Maglumat bazasynda entek hiç hili haryt tapylmady.
                  </td>
                </tr>
              ) : (
                products.map((p: Product) => (
                  <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </span>
                        <span className="text-xs text-gray-400">ID: {p.id.slice(0, 8)}...</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-tighter">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <span className="font-black text-blue-600 text-lg">
                        ${p.price.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Statistika Kartlary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Jemi Satuw</p>
          <h3 className="text-3xl font-bold text-gray-800">$12,450</h3>
          <p className="text-green-500 text-xs mt-2">+12% geçen aýdan</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Sargytlar</p>
          <h3 className="text-3xl font-bold text-gray-800">156</h3>
          <p className="text-blue-500 text-xs mt-2">24 täze sargyt</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Müşderiler</p>
          <h3 className="text-3xl font-bold text-gray-800">1,240</h3>
          <p className="text-purple-500 text-xs mt-2">+5 täze agza</p>
        </div>
      </div>

      {/* Soňky Sargytlar Tablisasy (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Soňky Sargytlar</h3>
        <div className="text-gray-400 text-center py-10 border-2 border-dashed rounded-lg">
          Sargytlar maglumat bazasyndan çekiler...
        </div>
      </div>
    </div>
  );
}

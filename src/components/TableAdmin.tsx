import { FilePenLine, Trash2 } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_DB_HOST;
export type DataClothes = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const TableAdmin = async (): Promise<React.ReactElement> => {
  const response = await fetch(`${BACKEND_URL}/clothes`);
  const clothes = (await response.json()) as DataClothes[];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Título</th>
            <th className="py-3 px-6 text-left">Descripción</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {clothes.map((cloth) => (
            <tr
              key={cloth.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{cloth.id}</td>
              <td className="py-3 px-6 text-left">{cloth.title}</td>
              <td className="py-3 px-6 text-left">{cloth.description}</td>
              <td className="py-3 px-6 text-left">${cloth.price}</td>
              <td className="py-3 px-6 text-left">
                <button type="button" className="hover:text-blue-500">
                  <FilePenLine />
                </button>
                <button type="button" className="hover:text-blue-500">
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdmin;

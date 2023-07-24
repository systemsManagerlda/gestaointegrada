const getFilas = async () => {
  const res = await fetch("https://www.systemsmanagerlda.com/api/filas", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log("Server Side");
  return res.json();
};

export default async function FilaTab() {
  const filas = await getFilas();
  return (
    <div className="overflow-auto rounded-lg shadow mt-4">
      <table className="w-full">
        <thead className="bg-blue-100 border=b-2 border-blue-200">
          <tr>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-letf">
              N.
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-letf">
              Nome do Cliente
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-letf">
              Nome do Serviço
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-letf">
              Preço
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-letf">
              Funcionário
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-letf">
              Data/Hora
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-letf">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gra">
          {filas?.length > 0 &&
            filas.map((fila, index) => (
              <>
                {fila.status === "Não Atendido" && (
                  <tr className="bg-white">
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {fila.cliente}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {fila.nomeServico}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {fila.precoServico}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {fila.funcionario}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      {fila.dataHora}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-800 rounded-lg bg-opacity-40">
                        {fila.status}
                      </span>
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

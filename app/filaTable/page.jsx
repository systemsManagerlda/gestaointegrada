"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { Dropdown, Modal, useModal, Loading } from "@nextui-org/react";

function FilaTable() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const [filas, setFilas] = useState([]);
  const { data: session } = useSession();
  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      setFilas(data);
    };
    session?.user.id fetchPosts();
  }, [session?.user.id]);
  useEffect(() => {
    const volatel = [];
    setFilas([]);
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      data.map((func) => {
        if (selectedValue === func.funcionario) {
          console.log(func);
          volatel.push(func);
        }
      });
      setFilas(volatel);
    };
    fetchPosts();
  }, [selected]);
  function filaActual() {
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      setFilas(data);
    };
    session?.user.id fetchPosts();
  }
  return (
    <div className="glassmorphism  flex-grow">
      <div className="flex space-x-4">
        <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
          Fila de Espera:
        </span>
        <Button onPress={() => router.push("/filas")} size="sm">
          Add Serviço
        </Button>
        <Button onPress={() => filaActual()} size="sm">
         Actualizar Fila
        </Button>
        <Dropdown>
          <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="primary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
          >
            <Dropdown.Item key="Carlos Avelino">Carlos Avelino</Dropdown.Item>
            <Dropdown.Item key="Alimiro Pires">Alimiro Pires</Dropdown.Item>
            <Dropdown.Item key="Amélia Marcos">Amélia Marcos</Dropdown.Item>
            <Dropdown.Item key="Glória David">Glória David</Dropdown.Item>
            <Dropdown.Item key="Moises Lucas">Moises Lucas</Dropdown.Item>
            <Dropdown.Item key="Stélio Aderito">Stélio Aderito</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

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
            {filas.length > 0 &&
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
    </div>
  );
}

export default FilaTable;

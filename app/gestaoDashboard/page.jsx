"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Card,
  Dropdown,
  Text,
  Button,
  Row,
  Modal,
  useModal,
  Grid,
  Loading,
} from "@nextui-org/react";

function GestaoDashboard() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const [filas, setFilas] = useState([]);
  const { data: session } = useSession();
  const [processando, setProcessando] = useState(false);
  const [mudanca, setMudanca] = useState("");
  const { setVisible, bindings } = useModal();
  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      console.log(data);
      setFilas(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  useEffect(() => {
    const volatel = [];
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
  async function deleteFilas(iDD2) {
    setMudanca("");
    setProcessando(true);
    try {
      const response = await fetch(`api/servicos/${iDD2}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessando(false);
      setVisible(true);
    }
  }

  function filaActual() {
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      setFilas(data);
    };
    fetchPosts();
  }

  async function editFilas(iDD2) {
    setProcessando(true);
    try {
      setProcessando(true);
      setMudanca("");
      filas.map((fila) => {
        if (iDD2 === fila._id) {
          const response = fetch(`api/servicos/${iDD2}`, {
            method: "PATCH",
            body: JSON.stringify({
              nomeServico: fila.nomeServico,
              precoServico: fila.precoServico,
              cliente: fila.cliente,
              userId: fila.userId,
              funcionario: fila.funcionario,
              status: "Atendido",
              dataHora: fila.dataHora,
            }),
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProcessando(false);
      setVisible(true);
    }
  }

  return (
    <>
      <div className="glassmorphism  flex-grow">
        <div className="flex space-x-4">
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
          <Button onPress={() => filaActual()} size="sm">
            Actualizar Fila
          </Button>
        </div>
        {processando && (
          <div className="justify-center items-center">
            <Grid.Container gap={2}>
              <Grid>
                <Loading color="primary">Processando...</Loading>
              </Grid>
            </Grid.Container>
          </div>
        )}
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
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-letf">
                  Acção
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gra">
              {filas.length > 0 &&
                filas.map((fila, index) => (
                  <>
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
                      {fila.status === "Não Atendido" && (
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-800 rounded-lg bg-opacity-40">
                            {fila.status}
                          </span>
                        </td>
                      )}
                      {fila.status === "Atendido" && (
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-800 rounded-lg bg-opacity-40">
                            {fila.status}
                          </span>
                        </td>
                      )}
                      <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                        <div class="flex space-x-4">
                          <Button onPress={() => editFilas(fila._id)} size="sm">
                            Atendido
                          </Button>
                          <Button
                            flat
                            color="error"
                            onPress={() => deleteFilas(fila._id)}
                            size="sm"
                          >
                            Desistiu
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
        <Modal
          scroll
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
                Sucesso!
              </span>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text id="modal-description">
              Acção executada com sucesso actualize a página para ver a
              mudança...
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button auto onPress={() => setVisible(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default GestaoDashboard;

"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Button,
  Input,
  Grid,
  Loading,
  Modal,
  useModal,
  Dropdown,
  Text,
} from "@nextui-org/react";

function Presencas() {
  const { data: session } = useSession();
  const [processando, setProcessando] = useState(false);
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const { setVisible, bindings } = useModal();
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [senha, setSenha] = useState("");
  const [codigoAutenticacao, setCodigoAutenticacao] = useState("");
  const [presencas, setPresencas] = useState([]);
  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));
  const [selected2, setSelected2] = React.useState(new Set(["Mês"]));
  const [presencasTabela, setPresencasTabela] = useState([]);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let mes = month[d.getMonth()];

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const selectedValue2 = React.useMemo(
    () => Array.from(selected2).join(", ").replaceAll("_", " "),
    [selected2]
  );
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/codigoAutenticacao/${session?.user.id}`
      );
      const data = await response.json();
      setPresencas(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/presencas/${session?.user.id}`);
      const data = await response.json();
      console.log(data);
      setPresencasTabela(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  const funcionarios = [
    "Amelia Marcos Franguana",
    "Stelio Aderito Fanheiro",
    "Dercio Jara Mbalane",
    "Almiro Pires",
    "Sergio Jose Macucule",
    "Moises Lucas Cuna",
    "Carlos Avelino Mabote",
    "Gloria David Timane",
    "Dercia Nelson Samuel",
  ];
  const senhas = [
    "bar7878980bershop",
    "barbersho7878980p",
    "78der78cio980",
    "al7878980miro",
    "ser7878980gio",
    "moi7878980ses",
    "ca7878980rlos",
    "Gloria7878980",
    "der7878980cia",
  ];

  function CondigoAutenticacao() {
    setProcessando(true);
    console.log(presencas);
    // setVisible(true);
    const primeiroNumero = Math.floor(Math.random() * 10);
    const segundoNumero = Math.floor(Math.random() * 10);
    const terceiroNumero = Math.floor(Math.random() * 10);
    const quartoNumero = Math.floor(Math.random() * 10);
    const codigoGerado =
      `${primeiroNumero}` +
      `${segundoNumero}` +
      `${terceiroNumero}` +
      `${quartoNumero}`;
    //   alert(codigoGerado);
    try {
      if (nomeEmpresa === "" || nomeColaborador === "" || senha === "") {
        alert("Todos os capos devem ser preenchidos");
      } else {
        if (nomeEmpresa === "Crowd Masters Barbershop") {
          if (funcionarios.includes(nomeColaborador)) {
            if (senhas.includes(senha)) {
              if (presencas.length === 0) {
                try {
                  const response = fetch("/api/codigoAutenticacao", {
                    method: "POST",
                    body: JSON.stringify({
                      codigo: codigoGerado,
                      userId: session?.user.id,
                    }),
                  });
                  setProcessando(true);
                  window.localStorage.setItem("colaborador", nomeColaborador);
                  window.localStorage.setItem("codigo", codigoGerado);
                  router.push(`/presencaCodigp/${nomeColaborador}`);
                } catch (error) {
                  console.log(error);
                }
              } else {
                try {
                  presencas.map((cod) => {
                    const response = fetch(
                      `/api/codigoAutenticacao/${cod._id}`,
                      {
                        method: "PATCH",
                        body: JSON.stringify({
                          codigo: codigoGerado,
                          userId: session?.user.id,
                        }),
                      }
                    );
                    setProcessando(true);
                    window.localStorage.setItem("colaborador", nomeColaborador);
                    window.localStorage.setItem("codigo", codigoGerado);
                    router.push(`/presencaCodigp/${nomeColaborador}`);
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            } else {
              alert("Senha Incorrecta");
              router.push("/presencas");
            }
          } else {
            alert("Colaborador não registrado!");
            router.push("/presencas");
          }
        } else {
          alert("Empresa não registrada!");
          router.push("/presencas");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="glassmorphism flex-grow">
        <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
          Marcar Presença:
        </span>
        <div className="content-center justify-center mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
          <Container>
            <Card>
              <Card.Body>
                <Input
                  value={nomeColaborador}
                  onChange={(ev) => setNomeColaborador(ev.target.value)}
                  className="mb-4"
                  type="text"
                  placeholder="Nome do Colaborador"
                />
                <Input
                  value={nomeEmpresa}
                  onChange={(ev) => setNomeEmpresa(ev.target.value)}
                  className="mb-4"
                  type="text"
                  placeholder="Nome da Empresa"
                />
                <Input
                  value={senha}
                  onChange={(ev) => setSenha(ev.target.value)}
                  className="mb-4"
                  type="password"
                  placeholder="Senha"
                />
                <Row justify="flex-end">
                  {processando && (
                    <div className="justify-center items-center">
                      <Grid.Container gap={2}>
                        <Grid>
                          <Loading color="primary"></Loading>
                        </Grid>
                      </Grid.Container>
                    </div>
                  )}
                  <Button
                    onPress={() => CondigoAutenticacao()}
                    type="button"
                    size="sm"
                  >
                    Confirmar
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
      <div className="glassmorphism flex-grow mt-4">
        <div className="flex space-x-4">
          <Input
            // value={nomeColaborador}
            // onChange={(ev) => setNomeColaborador(ev.target.value)}
            className="mb-4"
            type="date"
            placeholder="Data"
          />
          <Dropdown>
            <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
              {selectedValue2}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected2}
              onSelectionChange={setSelected2}
            >
              {month.map((meses) => (
                <Dropdown.Item key={meses}>{meses}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
                <th className="">Nome do Colaborador</th>
                <th className="">Hora de Chegada</th>
                <th className="w-24">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gra">
              {presencasTabela.length > 0 &&
                presencasTabela.map((fila) => (
                  <>
                    {
                      <tr className="bg-white">
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {fila.nomeColaborador}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {fila.horaChegada}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {fila.data}
                        </td>
                      </tr>
                    }
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Presencas;

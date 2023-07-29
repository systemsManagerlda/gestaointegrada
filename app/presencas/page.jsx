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
  const [tempoMarcacao, settempoMarcacao] = useState(false);
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const { setVisible, bindings } = useModal();
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [senha, setSenha] = useState("");
  const [codigoAutenticacao, setCodigoAutenticacao] = useState("");
  const [dataSelecionada, setdataSelecionada] = useState("");
  const [presencas, setPresencas] = useState([]);
  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));
  const [selected2, setSelected2] = React.useState(new Set(["Mês"]));
  const [selected3, setSelected3] = React.useState(
    new Set(["Tipo de Presença"])
  );
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
  const selectedValue3 = React.useMemo(
    () => Array.from(selected3).join(", ").replaceAll("_", " "),
    [selected3]
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
      var hora = "";
      var min = "";
      var seg = "";
      var currentdate = new Date();
      var datetime =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      if (`${currentdate.getHours()}`.length === 1) {
        hora = `0${currentdate.getHours()}`;
      } else {
        hora = `${currentdate.getHours()}`;
      }
      if (`${currentdate.getMinutes()}`.length === 1) {
        min = `0${currentdate.getMinutes()}`;
      } else {
        min = `${currentdate.getMinutes()}`;
      }
      if (`${currentdate.getSeconds()}`.length === 1) {
        seg = `0${currentdate.getSeconds()}`;
      } else {
        seg = `${currentdate.getSeconds()}`;
      }
      const time1 = "06:30:00";
      const time2 = "09:30:00";

      if (`${hora}:${min}:${seg}` > time2) {
        console.log("time1 is greater than time2");
        settempoMarcacao(false);
      } else if (time2 > `${hora}:${min}:${seg}`) {
        // ✅ this runs
        console.log("time2 is greater than time1");
        settempoMarcacao(true);
      } else {
        console.log("time1 is equal to time2");
      }

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
                  window.localStorage.setItem("tipoPresenca", selectedValue3);
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
                    window.localStorage.setItem("tipoPresenca", selectedValue3);
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
  function filtro() {
    const novoFiltro = [];
    if (selectedValue === "Funcionário" || dataSelecionada === "") {
      alert("Nenhum paramentro seleccionado");
    } else {
      const dataD = new Date(dataSelecionada);
      let mesSeleccionado = month[dataD.getMonth()];
      console.log(mesSeleccionado);
      try {
        const fetchPosts = async () => {
          const response = await fetch(`/api/presencas/${session?.user.id}`);
          const data = await response.json();
          data.map((cola) => {
            console.log(month[parseInt(cola.mes) - 1]);
            if (cola.nomeColaborador === selectedValue) {
              if (month[parseInt(cola.mes) - 1] === mesSeleccionado) {
                novoFiltro.push(cola);
                console.log("Aqui");
              }
            }
          });
          console.log(novoFiltro);
          setPresencasTabela(novoFiltro);
        };
        if (session?.user.id) fetchPosts();
      } catch (error) {
        console.log(error);
      }
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
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="primary"
                    css={{ tt: "capitalize" }}
                  >
                    {selectedValue3}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected3}
                    onSelectionChange={setSelected3}
                  >
                    <Dropdown.Item key="Entrada">Entrada</Dropdown.Item>
                    <Dropdown.Item key="Saida">Saida</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="mb-4"></div>
                <Input
                  value={senha}
                  onChange={(ev) => setSenha(ev.target.value)}
                  className="mb-4"
                  type="password"
                  placeholder="Senha"
                />
                <Row justify="flex-end">
                  {tempoMarcacao ? (
                    <>
                      {processando ? (
                        <div className="justify-center items-center">
                          <Grid.Container gap={2}>
                            <Grid>
                              <Loading color="primary"></Loading>
                            </Grid>
                          </Grid.Container>
                        </div>
                      ) : (
                        <Button
                          onPress={() => CondigoAutenticacao()}
                          type="button"
                          size="sm"
                        >
                          Confirmar
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <p>O tempo para marcação de presenças foi excedido</p>
                    </>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
      <div className="glassmorphism flex-grow mt-4">
        <div className="flex space-x-4">
          <Input
            value={dataSelecionada}
            onChange={(ev) => setdataSelecionada(ev.target.value)}
            className="mb-4"
            type="date"
          />
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
              <Dropdown.Item key="Carlos Avelino Mabote">
                Carlos Avelino Mabote
              </Dropdown.Item>
              <Dropdown.Item key="Alimiro Pires">Alimiro Pires</Dropdown.Item>
              <Dropdown.Item key="Amelia Marcos Franguana">
                Amelia Marcos Franguana
              </Dropdown.Item>
              <Dropdown.Item key="Gloria David Timane">
                Gloria David Timane
              </Dropdown.Item>
              <Dropdown.Item key="Moises Lucas Cuna">
                Moises Lucas Cuna
              </Dropdown.Item>
              <Dropdown.Item key="Stelio Aderito Fanheiro">
                Stelio Aderito Fanheiro
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onPress={() => filtro()} type="button" size="sm">
            Filtrar
          </Button>
        </div>
        <div className="overflow-auto rounded-lg shadow mt-4">
          <table className="w-full">
            <thead className="bg-blue-100 border=b-2 border-blue-200">
              <tr>
                <th className="">Nome do Colaborador</th>
                <th className="">Hora de Chegada</th>
                <th className="">Tipo de Presença</th>
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
                          {fila.tipoPresenca}
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

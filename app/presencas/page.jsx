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
  const [salrioPresencas, setSalrioPresencas] = useState(false);
  const [tempoMarcacao, settempoMarcacao] = useState(false);
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const { setVisible, bindings } = useModal();
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [senha, setSenha] = useState("");
  const [bonus, setBonus] = useState("0");
  const [folgas, setFolgas] = useState("0");
  const [salarioMes, setSalarioMes] = useState("");
  const [totalHorasTrabalho, setTotalHorasTrabalho] = useState(0);
  const [totalHorasExtras, setTotalHorasExtras] = useState(0);
  const [salarioPorHora, setSalarioPorHora] = useState(0);
  const [salarioFinal, setSalarioFinal] = useState(0);
  const [status, setStatus] = useState(0);
  const [codigoAutenticacao, setCodigoAutenticacao] = useState("");
  const [dataSelecionada, setdataSelecionada] = useState("");
  const [presencas, setPresencas] = useState([]);
  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));
  const [selected2, setSelected2] = React.useState(new Set(["Mês"]));
  const [selected3, setSelected3] = React.useState(
    new Set(["Tipo de Presença"])
  );
  const [selected4, setSelected4] = React.useState(
    new Set(["Nome do Colaborador"])
  );
  const [selected5, setSelected5] = React.useState(
    new Set(["Nome da Empresa"])
  );
  let moificado = 0;
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
  const selectedValue4 = React.useMemo(
    () => Array.from(selected4).join(", ").replaceAll("_", " "),
    [selected4]
  );
  const selectedValue5 = React.useMemo(
    () => Array.from(selected5).join(", ").replaceAll("_", " "),
    [selected5]
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
    "Fatima Regina Come",
  ]; 
  const salarios = [
    {
      colaborador: "Amelia Marcos Franguana",
      salario: "5000"
    },
    {
      colaborador: "Stelio Aderito Fanheiro",
      salario: "5000"
    },
    {
      colaborador: "Almiro Pires",
      salario: "6500"
    },
    {
      colaborador: "Dercia Nelson Samuel",
      salario: "3500"
    },
    {
      colaborador: "Moises Lucas Cuna",
      salario: "3500"
    },
    {
      colaborador: "Fatima Regina Come",
      salario: "3700"
    }
  ]
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
    "Fatima78780ma",
  ];
  function saidaPresenca() {
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
    const time1 = "20:00:00";
    const time2 = "23:59:00";

    if (time1 < `${hora}:${min}:${seg}`) {
      if (`${hora}:${min}:${seg}` < time2) {
        console.log("time1 is greater than time2");
        settempoMarcacao(true);
      } else {
        alert("O tempo de marcação de saída ainda não foi atingido");
      }
    } else {
      alert("O tempo de marcação de saída ainda não foi atingido");
    }
  }
  function primeiroTurno() {
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
    const time1 = "08:30:00";
    const time2 = "14:00:00";

    if (time1 < `${hora}:${min}:${seg}`) {
      if (`${hora}:${min}:${seg}` < time2) {
        console.log("time1 is greater than time2");
        settempoMarcacao(true);
      } else {
        alert("O tempo de marcação ainda não foi atingido");
      }
    } else {
      alert("O tempo de marcação ainda não foi atingido");
    }
  }
  function segundoTurno() {
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
    const time1 = "13:30:00";
    const time2 = "20:00:00";

    if (time1 < `${hora}:${min}:${seg}`) {
      if (`${hora}:${min}:${seg}` < time2) {
        console.log("time1 is greater than time2");
        settempoMarcacao(true);
      } else {
        alert("O tempo de marcação ainda não foi atingido");
      }
    } else {
      alert("O tempo de marcação ainda não foi atingido");
    }
  }
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
      if (selectedValue5 === "" || selectedValue4 === "" || senha === "") {
        alert("Todos os capos devem ser preenchidos");
      } else {
        if (selectedValue5 === "Crowd Masters Barbershop") {
          if (funcionarios.includes(selectedValue4)) {
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
                  window.localStorage.setItem("colaborador", selectedValue4);
                  window.localStorage.setItem("codigo", codigoGerado);
                  window.localStorage.setItem("tipoPresenca", selectedValue3);
                  router.push(`/presencaCodigp/${selectedValue4}`);
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
                    window.localStorage.setItem("colaborador", selectedValue4);
                    window.localStorage.setItem("codigo", codigoGerado);
                    window.localStorage.setItem("tipoPresenca", selectedValue3);
                    router.push(`/presencaCodigp/${selectedValue4}`);
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
  useEffect(() => {
    console.log("Modificado",status);
    setSalarioFinal(((totalHorasTrabalho.toFixed(2)*salarioPorHora.toFixed(2))+(totalHorasExtras.toFixed(2)*salarioPorHora.toFixed(2))+(parseInt(folgas)*11.5*salarioPorHora.toFixed(2))+parseInt(bonus)).toFixed(2))
  }, [status])
  function salariosGerado() {
    moificado = 0;
    setVisible(false)
    setSalrioPresencas(true)
    var totalHoraTrabalho = 0;
    var totalHoraEXtra= 0;
    const dataD = new Date(dataSelecionada);
      let mesSeleccionado = month[dataD.getMonth()];
      try {
        const fetchPosts = async () => {
          const response = await fetch(`/api/presencas/${session?.user.id}`);
          const data = await response.json();
          salarios.map((salario) => {
            if (salario.colaborador === selectedValue) {
              setSalarioMes(salario.salario)
              setSalarioPorHora((salario.salario/30)/11.5)
              data.map((cola) => {
                if (cola.nomeColaborador === selectedValue) {
                  var string = cola.horaChegada;
                    var length = 2;
                    var trimmedStringHora = string.substring(0, length);
                    var trimmedStringMinutos = string.substring(2, 4);
                    var trimmedStringMinutosExtra = string.substring(3, 5);
                  if (month[parseInt(cola.mes) - 1] === mesSeleccionado) {                    
                    if (parseInt(trimmedStringHora) < 20) {
                      console.log(string);
                      console.log("Horas",parseInt(trimmedStringHora));
                      console.log("Minutos",parseInt(trimmedStringMinutos));
                      if (parseInt(trimmedStringMinutos)) {
                        totalHoraTrabalho += 20 - parseInt(trimmedStringHora)+(parseInt(trimmedStringMinutos)*0.5)/30;
                        setTotalHorasTrabalho(totalHoraTrabalho)
                      } else {
                        trimmedStringMinutos = string.substring(3, 5);
                        console.log("Minutos Else",parseInt(trimmedStringMinutos));
                        if (parseInt(trimmedStringMinutos)) {
                          totalHoraTrabalho += 20 - parseInt(trimmedStringHora)+(parseInt(trimmedStringMinutos)*0.5)/30;
                          setTotalHorasTrabalho(totalHoraTrabalho)
                        } else {
                          trimmedStringMinutos = string.substring(2, 4);
                          if (parseInt(trimmedStringMinutos)) {
                            console.log("Minutos Else 2",parseInt(trimmedStringMinutos));
                            totalHoraTrabalho += 20 - parseInt(trimmedStringHora)+(parseInt(trimmedStringMinutos)*0.5)/30;
                            setTotalHorasTrabalho(totalHoraTrabalho)
                          } else {
                            trimmedStringMinutos = string.substring(3, 5);
                            console.log("Minutos Else 3",parseInt(trimmedStringMinutos));
                            totalHoraTrabalho += 20 - parseInt(trimmedStringHora)+(parseInt(trimmedStringMinutos)*0.5)/30;
                            setTotalHorasTrabalho(totalHoraTrabalho)
                          }
                          
                        }
                        
                      }                      
                    } else {
                      totalHoraEXtra += (parseInt(trimmedStringHora)-20)+(parseInt(trimmedStringMinutosExtra)*0.5)/30;
                      // console.log(string);
                      // console.log("Minutos",(parseInt(trimmedStringMinutosExtra)*0.5)/30);
                      // console.log("Horas Extras",parseInt(totalHoraEXtra));
                      // console.log("Horas",parseInt(trimmedStringHora));
                      setTotalHorasExtras(totalHoraEXtra)
                    }
                    moificado += 1;
                    setStatus(moificado)
                  }
                }
                
              });
            }
            
          });
          
        };
        if (session?.user.id) fetchPosts();
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <div className="glassmorphism flex-grow">
        <div className="flex flex-row gap-4">
          <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
            Marcar Presença:
          </span>
          <Button onPress={() => saidaPresenca()} type="button" size="sm">
            Saida
          </Button>
          <Button onPress={() => primeiroTurno()} type="button" size="sm">
            Primeiro Turno
          </Button>
          <Button onPress={() => segundoTurno()} type="button" size="sm">
            Segundo Turno
          </Button>
          <Button onPress={() => setVisible(true)} type="button" size="sm">
            Gerar Salário
          </Button>
        </div>

        <div className="content-center justify-center mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
          <Container>
            <Card>
              <Card.Body>
              <Dropdown>
                <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                  {selectedValue4}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected4}
                  onSelectionChange={setSelected4}
                >
                  <Dropdown.Item key="Carlos Avelino Mabote">
                    Carlos Avelino Mabote
                  </Dropdown.Item>
                  <Dropdown.Item key="Almiro Pires">Almiro Pires</Dropdown.Item>
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
                  <Dropdown.Item key="Fatima Regina Come">
                  Fatima Regina Come
                  </Dropdown.Item>
                  <Dropdown.Item key="Dercia Nelson Samuel">
                  Dercia Nelson Samuel
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="mb-4"></div>
              <Dropdown>
                <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                  {selectedValue5}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="primary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected5}
                  onSelectionChange={setSelected5}
                >
                  <Dropdown.Item key="Crowd Masters Barbershop">
                  Crowd Masters Barbershop
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="mb-4"></div>
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
              <Dropdown.Item key="Almiro Pires">Almiro Pires</Dropdown.Item>
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
              <Dropdown.Item key="Fatima Regina Come">
              Fatima Regina Come
              </Dropdown.Item>
              <Dropdown.Item key="Dercia Nelson Samuel">
              Dercia Nelson Samuel
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onPress={() => filtro()} type="button" size="sm">
            Filtrar
          </Button>
        </div>
        <div className="overflow-auto rounded-lg shadow mt-4">
          {salrioPresencas ? (
            <>
            <table className="w-full">
            <thead className="bg-blue-100 border=b-2 border-blue-200">
              <tr>
                <th className="">Nome do Colaborador</th>
                <th className="">T. Hora de Trabalho</th>
                <th className="">T. Hora Extra</th>
                <th className="">Salário/Hora</th>
                <th className="">Bônus</th>
                <th className="">Salario do Mês</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gra">
            <tr className="bg-white">
                        <td className=" flex justify-center whitespace-nowrap p-3 text-sm text-gray-700">
                          {selected}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                        {totalHorasTrabalho.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {totalHorasExtras.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {salarioPorHora.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {parseInt(bonus)}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                          {salarioFinal}
                        </td>
                      </tr>
            </tbody>
          </table>
            </>
            ) : (
            <>
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
            </>
            )
          }
          
        </div>
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
              Gerar Folha de Salário
            </span>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Button
                    flat
                    color="primary"
                    css={{ tt: "capitalize" }}
                  >
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
                    <Dropdown.Item key="Amelia Marcos Franguana">Amelia Marcos Franguana</Dropdown.Item>
                    <Dropdown.Item key="Stelio Aderito Fanheiro">Stelio Aderito Fanheiro</Dropdown.Item>
                    <Dropdown.Item key="Dercio Jara Mbalane">Dercio Jara Mbalane</Dropdown.Item>
                    <Dropdown.Item key="Almiro Pires">Almiro Pires</Dropdown.Item>
                    <Dropdown.Item key="Fatima Regina Come">Fatima Regina Come</Dropdown.Item>
                    <Dropdown.Item key="Moises Lucas Cuna">Moises Lucas Cuna</Dropdown.Item>
                    <Dropdown.Item key="Carlos Avelino Mabote">Carlos Avelino Mabote</Dropdown.Item>
                    <Dropdown.Item key="Gloria David Timane">Gloria David Timane</Dropdown.Item>
                    <Dropdown.Item key="Dercia Nelson Samuel">Dercia Nelson Samuel</Dropdown.Item>
                  </Dropdown.Menu>
            </Dropdown>
            <p>Bônus</p>
            <Input
                  value={bonus}
                  onChange={(ev) => setBonus(ev.target.value)}
                  className="mb-4"
                  type="number"
                  placeholder="Bônus"
                />
                <p>Folgas</p>
            <Input
                  value={folgas}
                  onChange={(ev) => setFolgas(ev.target.value)}
                  className="mb-4"
                  type="number"
                  placeholder="Folgas"
                />
                <Input
            value={dataSelecionada}
            onChange={(ev) => setdataSelecionada(ev.target.value)}
            className="mb-4"
            type="date"
          />
          </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => salariosGerado()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Presencas;

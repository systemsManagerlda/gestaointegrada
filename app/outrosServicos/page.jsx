"use client";
import Link from "next/link";
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
import { useSession } from "next-auth/react";

const cortes = [
  { corte: "Pestanas Humanas do Salão", preco: "250" },
  { corte: "Pestanas Normais do Salão", preco: "200" },
  { corte: "Pestanas Humanas a Saia", preco: "200" },
  { corte: "Pestanas Humanas Normais do Cliente", preco: "100" },
  { corte: "Retocar Dreds e Lavar com Gel do Salão", preco: "400" },
  { corte: "Retocar Dreds Sem Lavar com Gel do Salão", preco: "350" },
  { corte: "Retocar Dreds Sem Lavar com Gel Com Gel Pessoal", preco: "250" },
  { corte: "Retocar e Fazer Moda com Gel do Salão", preco: "500" },
  { corte: "Retocar e Fazer Moda com Gel Pessoal", preco: "350" },
];
function LavarCabelo() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " bg-primary-orange rounded-lg text-white";
  const router = useRouter();
  const pathname = usePathname();
  const [nomeServico, setNomeServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");
  const [cliente, setCliente] = useState("");
  const { data: session } = useSession();
  const [processando, setProcessando] = useState(false);
  const { setVisible, bindings } = useModal();

  const [selected, setSelected] = React.useState(new Set(["Funcionário"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  async function cortesSelect(corte) {
    var currentdate = new Date();
    var datetime =
      "Data: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " Hora: " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    if (selectedValue === "Funcionário") {
      setVisible(true);
    } else {
      setProcessando(true);
      try {
        const response = await fetch("api/servicos/new", {
          method: "POST",
          body: JSON.stringify({
            nomeServico: corte.corte,
            precoServico: corte.preco,
            cliente: session?.user.name,
            userId: session?.user.id,
            funcionario: selectedValue,
            status: "Não Atendido",
            dataHora: `${datetime}`,
          }),
        });
        if (response.ok) {
          router.push("/filaTable");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setProcessando(false);
        router.push("/filaTable");
      }
    }
  }

  return (
    <div className="glassmorphism  flex-grow">
      <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
        Para marcar fila selecione um dos serviços:
      </span>
      {processando && (
        <div className="justify-center items-center">
          <Grid.Container gap={2}>
            <Grid>
              <Loading color="primary">Processando...</Loading>
            </Grid>
          </Grid.Container>
        </div>
      )}
      <div class="content-center justify-center mt-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {cortes.map((cor) => (
          <Card css={{ mw: "330px" }}>
            <Card.Header>
              <div className="flex flex-col">
                <Text b>{cor.corte}</Text>
                <Text b>Preço: {cor.preco}.00 Mt</Text>
              </div>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
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
                  <Dropdown.Item key="Carlos Avelino">
                    Carlos Avelino
                  </Dropdown.Item>
                  <Dropdown.Item key="Alimiro Pires">
                    Alimiro Pires
                  </Dropdown.Item>
                  <Dropdown.Item key="Amélia Marcos">
                    Amélia Marcos
                  </Dropdown.Item>
                  <Dropdown.Item key="Glória David">Glória David</Dropdown.Item>
                  <Dropdown.Item key="Moises Lucas">Moises Lucas</Dropdown.Item>
                  <Dropdown.Item key="Stélio Aderito">
                    Stélio Aderito
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button
                  type="button"
                  onPress={() => cortesSelect(cor)}
                  size="sm"
                >
                  Selecionar
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        ))}
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
              Erro!
            </span>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            Não foi seleccionado um funcionário para lhe atender...
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => setVisible(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LavarCabelo;

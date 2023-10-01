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
  Modal,
  Grid,
  Loading,
  useModal,
  Text,
} from "@nextui-org/react";

function PresencaCodigo({ params }) {
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
  let colaboradorLocal = "";
  let codigoLocal = "";
  let tipoPresenca = "";
  if (typeof window !== "undefined") {
    colaboradorLocal = window.localStorage.getItem("colaborador");
    codigoLocal = window.localStorage.getItem("codigo");
    tipoPresenca = window.localStorage.getItem("tipoPresenca");
  }

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
  function ConfirmarCodigo() {
    setProcessando(true);
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
    // presencas.map((cod) => {
    // });
    if (true) {
      try {
        async function marcarPresenca() {
          const response = await fetch("/api/presencas", {
            method: "POST",
            body: JSON.stringify({
              nomeColaborador: colaboradorLocal,
              nomeEmpresa: "Crowd Masters Barbershop",
              horaChegada: `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
              data: `${currentdate.getDate()}/${
                currentdate.getMonth() + 1
              }/${currentdate.getFullYear()}`,
              mes: `${currentdate.getMonth() + 1}`,
              tipoPresenca: tipoPresenca,
              userId: session?.user.id,
            }),
          });
          setProcessando(false);
          router.push("/presencas");
        }
        marcarPresenca();
      } catch (error) {
        console.log(error);
      }
    } else {
      setProcessando(false);
      alert("Código Incorrecto!");
      router.push(`/presencaCodigp/${params.colaborador}`);
    }
  }
  return (
    <div className="glassmorphism flex-grow">
      <span className="mb-4 font-satoshi font-semibold text-base text-gray-700 p-1">
        Marcar Presença:
      </span>
      <div className="content-center justify-center mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
        <Container>
          <Card>
            <Card.Body>
              <Input
                value={codigoLocal}
                onChange={(ev) => setCodigoAutenticacao(ev.target.value)}
                className="mb-4"
                type="number"
                placeholder="Código de Autenticação"
              />
              <Row justify="flex-end">
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
                    onPress={() => ConfirmarCodigo()}
                    type="button"
                    size="sm"
                  >
                    Confirmar
                  </Button>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default PresencaCodigo;

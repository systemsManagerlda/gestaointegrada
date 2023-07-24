"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import { Dropdown, Modal, useModal, Loading } from "@nextui-org/react";
import FilaTab from "./table/page";

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
      const data = await getData();
      setFilas(data);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    const volatel = [];
    const fetchPosts = async () => {
      const data = await getData();
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
      const data = await getData();
      setFilas(data);
    };
    fetchPosts();
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

      <FilaTab />
    </div>
  );
}

export default FilaTable;

async function getData() {
  const res = await fetch("https://www.systemsmanagerlda.com/api/filas", {
    next: {
      revalidate: 3,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

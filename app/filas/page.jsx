'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

function Filas() {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink + ' bg-primary-orange rounded-lg text-white';
  const router = useRouter();
  const pathname = usePathname();
  return (
        <div className='glassmorphism  flex-grow'>
          <div class="flex space-x-4">
            <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Para marcar fila selecione um dos serviços:</span>
            <Button onPress={() => router.push('/filaTable')} size="sm">Consultar Fila</Button>
          </div>         
          <div class="content-center justify-center mt-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Cortes</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}> 
                      <Text>
                        Para escolher um corte seleccione este campo.
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button type='button' onPress={() => router.push('/cortes')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Texturização</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para fazer Texturização seleccione este campo.
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/texturuzacao')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Lavar Cabelo</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para Lavar cabelo seleccione este campo.
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/lavarCabelo')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Activador de Caxos</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para activar caxos seleccione este campo.
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/activadorCaxos')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Pintar Cabelo</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para pintar cabelo seleccione este campo.
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/pintarCabelo')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
        </div>
      </div>    
  )
}

export default Filas
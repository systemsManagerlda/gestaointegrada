'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Container, Card, Row, Button, Input, Modal, useModal, Text } from "@nextui-org/react";

function Reclamacoes() {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink + ' bg-primary-orange rounded-lg text-white';
  const router = useRouter();
  const pathname = usePathname();
 
  return (
        <div className='glassmorphism flex-grow'>
            <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Efectuar Reclamação:</span>
            <div class="content-center justify-center mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
                <Container>
                    <Card>
                        <Card.Body>
                            <Input className='mb-4' type='text' placeholder="Nome do Colaborador" />
                            <Input className='mb-4' type='text' placeholder="Nome da Empresa" />
                            <Input className='mb-4' type='text' placeholder="Código de Autenticação" />
                            <Input className='mb-4' type='password' placeholder="Senha" />
                            <Row justify="flex-end">
                                <Button type='button' size="sm">Confirmar</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
            
        </div>    
  )
}

export default Reclamacoes
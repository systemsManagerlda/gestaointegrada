'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Container, Card, Row, Button, Input, Modal, useModal, Text } from "@nextui-org/react";

function Presencas() {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink + ' bg-primary-orange rounded-lg text-white';
  const router = useRouter();
  const pathname = usePathname();
  const { setVisible, bindings } = useModal();


  return (
        <div className='glassmorphism flex-grow'>
            <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Presenças:</span>
            <div class="content-center justify-center mt-4 grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
                <Container>
                    <Card>
                        <Card.Body>
                            <Input className='mb-4' type='text' placeholder="Nome do Colaborador" />
                            <Input className='mb-4' type='text' placeholder="Nome da Empresa" />
                            <Input className='mb-4' type='password' placeholder="Senha" />
                            <Row justify="flex-end">
                                <Button  onPress={() => setVisible(true)} type='button' size="sm">Confirmar</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
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
                <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'> Autenticar Presença</span>                   
                </Text>
                </Modal.Header>
                <Modal.Body>
                <Text id="modal-description">
                    Foi enviado um código de Autenticação para a sua plataforma de Gestão Empresarial
                </Text>
                <Input className='mb-4' type='number' placeholder="Código de Autenticação" />
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={() => setVisible(false)}>
                    Cancelar
                </Button>
                <Button auto onPress={() => setVisible(false)}>
                    Validar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>    
  )
}

export default Presencas;
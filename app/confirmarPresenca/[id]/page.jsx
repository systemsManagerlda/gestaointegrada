'use client';
import React, { useState, useEffect } from 'react';
import { Container, Tooltip, Link, Modal, Input, Loading, Button, Card, Row, Text, Avatar, Grid, Spacer, Col, Progress, Collapse } from "@nextui-org/react";
import Countdown from './countdown';
import { UserTwitterCard } from "./UserTwitterCard";
import { Streaming } from './Streaming';
import { DeleteUser } from "./DeleteUser";
import { StreamingContent } from "./StreamingContent";
import { useRouter } from 'next/navigation';


const pictureUsers = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
];

function ConfirmarPresenca({ params }) {
  const router = useRouter();
  const [convidado, setConvidado] = useState([]);
  const [evento, setEvento] = useState([]);
  const [grupo, setGrupo] = useState('');
  const [mesa, setMesa] = useState('');
  const [nomeConvidado, setNomeConvidado] = useState('');
  const [emailConvidado, setEmailConvidado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [userId, setUserID] = useState('');
  const [tipoConvidado, setTipoConvidado] = useState('');
  const [processando, setProcessando] = useState(false);


  useEffect(() => {
    const volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/convidadoUnico/${params.id}`);
      const data = await response.json();
      console.log(data);
      setConvidado(data);
      if (data.length != 0) {
        data.map((convidado) => {
          setGrupo(convidado.grupo);
          setMesa(convidado.mesa);
          setNomeConvidado(convidado.nomeConvidado);
          setEmailConvidado(convidado.emailConvidado);
          setMensagem(convidado.mensagem);
          setTipoConvidado(convidado.tipoConvidado);
          setUserID(data[0].creator._id)
        })  
      }  

      const fetchPosts2 = async () => {
        const response2 = await fetch(`/api/users/${data[0].creator._id}/posts`);
        const data2 = await response2.json();
        setEvento(data2);
      }
      fetchPosts2();
    }
    fetchPosts();
  },[]);

  async function recusado(iDD2) {
    setProcessando(true);
    try {
      const response = await fetch(`/api/padrinho/${iDD2}`, {
          method: 'PATCH',
          body: JSON.stringify({
            mensagem,
            nomeConvidado,
            emailConvidado,
            grupo,
            mesa,
            tipoConvidado,
            userId,
            status: 'recusado',
          })
      })
      if (response.ok) {
          router.push(`/confirmarPresenca/${iDD2}`);
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push(`/confirmarPresenca/${iDD2}`);
    }
  }

  async function confirmado(iDD2) {
    setProcessando(true);
    try {
      const response = await fetch(`/api/padrinho/${iDD2}`, {
          method: 'PATCH',
          body: JSON.stringify({
            mensagem,
            nomeConvidado,
            emailConvidado,
            grupo,
            mesa,
            tipoConvidado,
            userId,
            status: 'confirmado',
          })
      })
      if (response.ok) {
          router.push(`/confirmarPresenca/${iDD2}`);
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push(`/confirmarPresenca/${iDD2}`);
    }
  }

  return (
    <div>
      <Card>
        <div className='justify-center items-center'>
          <Card.Body>              
            {evento.length > 0 && evento.map((event) => (
              <>
                <Row justify="center" align="center">
                <div className='justify-center items-center'>
                  <Grid.Container gap={1}>
                    <Grid xs={12}>
                      <Avatar.Group>
                        {pictureUsers.map((url, index) => (
                          <Avatar
                            key={index}
                            size="lg"
                            pointer
                            src={url}
                            bordered
                            color="gradient"
                            stacked
                          />
                        ))}
                      </Avatar.Group>
                    </Grid>
                  </Grid.Container>             
                </div>          
              </Row>
                <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>{event.nomeNoiva} & {event.nomeNoivo}</span>
                <p><span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Data do Evento:</span> {event.dataEvento}</p>
                <p><span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Local do Evento:</span> {event.localEvento}</p>
                <p className='mb-2'>Contagem Regressiva</p>
                <Countdown data={event.dataEvento}/>
              </>
            ))}              
          </Card.Body>
        </div>
      </Card>
      <Spacer y={1} />
      <Card>
        <div className='justify-center items-center'>
          <Card.Body>              
            {convidado.length > 0 && convidado.map((convi) => (
              <>
              {convi.status === 'confirmado' && (
                <>
                  {processando && (
                      <div className='justify-center items-center'>
                      <Grid.Container gap={2}>
                      <Grid>
                        <Loading color="warning">Processando...</Loading>
                      </Grid>
                    </Grid.Container>
                    </div> 
                    )}
                  <Row justify="center" align="center">
                    <div className='justify-center items-center flex gap-4'>
                      <p>Convite Confirmado! Caso tenha mudado de ideia clique em: </p>
                      <Button onClick={() => recusado(convi._id)} bordered color="gradient" auto>
                      Recusar
                            </Button>
                    </div>
                  </Row>
                  <Spacer y={1} />
                  <Container gap={0}>
                    <Row gap={1}>
                      <Col>
                        <Card>
                          <Card.Body>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>{convi.tipoConvidado}</span>
                            </Text>
                            <Spacer y={1} />
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Dados do Convidado</span>
                            </Text>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Mensagem dos Noivos: </span>{convi.mensagem}
                            </Text>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Nome do Convidado: </span>{convi.nomeConvidado}
                            </Text>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Nome do Grupo: </span>{convi.grupo}
                            </Text>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                              <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Nome da Mesa: </span>{convi.mesa}
                            </Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Body>
                            <Text h6 size={15} color="black" css={{ m: 0 }}>
                            <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Formas de Visualizar o Evento</span>
                            </Text>
                            <Grid.Container gap={2} alignItems="center">
                            <Grid>
                              <Tooltip trigger="click" content={<DeleteUser />}>
                                <Link>
                                  <Text b color="error">
                                    Presencial
                                  </Text>
                                </Link>
                              </Tooltip>
                            </Grid>
                            <Grid>
                              <Tooltip placement="top" content={<UserTwitterCard />}>                                
                              </Tooltip>
                            </Grid>
                          </Grid.Container>
                          <Grid.Container gap={2} alignItems="center">
                            <Grid>
                              <Tooltip trigger="click" content={<StreamingContent />}>
                                <Link>
                                  <Text b color="error">
                                  Streaming
                                  </Text>
                                </Link>
                              </Tooltip>
                            </Grid>
                            <Grid>
                              <Tooltip placement="top" content={<Streaming />}>                                
                              </Tooltip>
                            </Grid>
                          </Grid.Container>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Spacer y={1} />
                  </Container>
                </>                
              )}
              {convi.status === 'recusado' && (
                <Row justify="center" align="center">
                <div className='justify-center items-center flex gap-4'>
                <p>Convite Recusado! Caso tenha mudado de ideia clique em: </p>
                <Button onClick={() => confirmado(convi._id)} bordered color="gradient" auto>
                        Confrimar
                      </Button>
                </div>
                </Row>
              )}
              {convi.status === 'pendente' && (
                <>
                  <p>O seu convite para este evento encontra-se pendente, selecione uma das opções abaixo para confirmar ou recusar o convite!</p>
                  <Spacer y={1} />
                  <Row justify="center" align="center">
                    <div className='justify-center items-center flex gap-4'>                  
                      <Button onClick={() => confirmado(convi._id)} bordered color="gradient" auto>
                        Confrimar
                      </Button>
                      <Button onClick={() => recusado(convi._id)} bordered color="gradient" auto>
                        Recusar
                      </Button>
                    </div>
                  </Row>
                </>               
              )}           
              </>
            ))}              
          </Card.Body>
        </div>
      </Card>
    </div>
  )
}

export default ConfirmarPresenca
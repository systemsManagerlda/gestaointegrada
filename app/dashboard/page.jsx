'use client';
import Profile from '@app/profile/page';
import React, { useState, useEffect } from 'react';
import { Container, Tooltip, Textarea, Modal, Input, Loading, Button, Card, Row, Text, Avatar, Grid, Spacer, Col, Progress, Collapse } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import Countdown from './countdown';
import { useRouter } from 'next/navigation';
import { Mail } from '@app/convidados/Mail';
import { IconButton } from '@app/convidados/IconButton';
import { EditIcon } from "@app/convidados/EditIcon";
import { DeleteIcon } from "@app/convidados/DeleteIcon";
let USDollar = new Intl.NumberFormat('en-US');


function Dashboard() {
  const {data: session } = useSession();
  const [evento, setEvento] = useState([]);
  const [cronograma, setCronograma] = useState([]);
  const [convidados, setConvidados] = useState(0);
  const [visibleRemover, setVisibleRemover] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [idd4, setIDD4] = useState('');
  const [data, setData] = useState('');
  const [corpo, setCorpo] = useState('');
  const [convidadosConfirmados, setConvidadosConfirmados] = useState(0);
  const [visible, setVisible] = useState(false);
  const [processando, setProcessando] = useState(false);
  const router = useRouter();

  const closeHandler = () => {
    setVisible(false);
  };
  const pictureUsers = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  ];
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data)
      setEvento(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/cronogramasT/${session?.user.id}/cronograma`);
      const data = await response.json();
      console.log(data)
      setCronograma(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = 0;
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        setConvidados(data.length);
        data.map((padrinho) => {
          if (padrinho.status === "confirmado") {          
            setConvidadosConfirmados((prev) => parseInt(prev) + 1)
          }
        });
        
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);

  async function saveCronograma() {
    setVisible(false);
    setProcessando(true);
    try {
      const response = await fetch('api/cronogramas/new', {
          method: 'POST',
          body: JSON.stringify({
            titulo,
            data,
            corpo,
            userId: session?.user.id,
          })
      })
      if (response.ok) {
          router.push('/dashboard');
      }
  } catch (error) {
      console.log(error); 
    }finally {
      setProcessando(false);
      router.push('/dashboard');
    }
  }

  function removerConograma(iD) {
    cronograma.map((crono) => {
      if (crono._id === iD) {
        setData(crono.data);
        setCorpo(crono.corpo);
        setTitulo(crono.titulo);
        setIDD4(iD);     
      }
      
    })
    setVisibleRemover(true);
  }

  function editarCronograma(iD) {
    cronograma.map((crono) => {
      if (crono._id === iD) {
        setData(crono.data);
        setCorpo(crono.corpo);
        setTitulo(crono.titulo);
        setIDD4(iD);     
      }
      
    })
    setVisibleEditar(true);
  }
  async function deletePadrinho(iDD2) {
    setVisibleRemover(false);
    setProcessando(true);
    try {
      const response = await fetch(`api/cronogramas/${iDD2}`, {
          method: 'DELETE',
          
      })
      if (response.ok) {
          router.push('/dashboard');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/dashboard');
    }
  }
  async function editCronogramaConfirm(iDD2) {
    setVisibleEditar(false);
    setProcessando(true);
    try {
      const response = await fetch(`api/cronogramas/${iDD2}`, {
          method: 'PATCH',
          body: JSON.stringify({
            titulo,
            data,
            corpo,
            userId: session?.user.id,
          })
      })
      if (response.ok) {
          router.push('/dashboard');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/dashboard');
    }
  }

  return (
    <Profile> 
      <Container>
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
      <Container gap={0}>
      <Spacer y={1} />
      <Row gap={1}>
        <Col>
          <Card>
          <div className='justify-center items-center'>
            <Card.Body>
            <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>
            {evento.length > 0 && evento.map((event) => (
              <>
                <Text h6 size={12} css={{ m: 0 }}>
                  Orçamento Inicial
                </Text>
                <Text h6 size={12} css={{ m: 0 }}>
                  {USDollar.format(event.orcamentoInicial)}.00 Mt
                </Text>
              </>              
            ))}
            
              <Progress size="sm" value={100} color="warning" />
            </span>              
            </Card.Body>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
          <div className='justify-center items-center'>
            <Card.Body>
            <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>
            <Text h6 size={12} css={{ m: 0 }}>
              Serv. Solicitados
              </Text>
              <Text h6 size={12} css={{ m: 0 }}>
                  {USDollar.format(0)}.00 Mt
                </Text>
              <Progress size="sm" value={70} color="warning" />
            </span> 
            </Card.Body>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
          <div className='justify-center items-center'>
            <Card.Body>
            <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>
            <Text h6 size={12} css={{ m: 0 }}>
              Conv. Confirmados
              </Text>
              <Text h6 size={12} css={{ m: 0 }}>
              {convidadosConfirmados}/{convidados}
              </Text>
              <Progress size="sm" value={25} color="warning" />
            </span> 
            </Card.Body>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
    <Spacer y={1} />
    {processando && (
        <div className='justify-center items-center'>
        <Grid.Container gap={2}>
        <Grid>
          <Loading color="warning">Processando...</Loading>
        </Grid>
      </Grid.Container>
      </div> 
      )}
    <Button onPress={() => setVisible(true)} bordered color="gradient" auto>
                  + Cronograma
                </Button>
    <Grid.Container gap={2}>
      <Grid>
        <Collapse.Group shadow>
          {cronograma.length > 0 && cronograma.map((crono) => (
            <Collapse title={crono.titulo}>
              <Row justify="center" align="center">
              <Col css={{ d: "flex" }}>
                <Tooltip content="Editar Cronograma">
                  <IconButton onClick={() => editarCronograma(crono._id)}>
                    <EditIcon size={20} fill="#979797" />
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip
                  content="Remover Cronograma"
                  color="error"
                  onClick={() => removerConograma(crono._id)}
                >
                  <IconButton>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </IconButton>
                </Tooltip>
              </Col>
            </Row>
              <Text>
                Data: {crono.data}
              </Text>
              <Text>
                {crono.corpo}
              </Text>
            </Collapse>
          ))}          
        </Collapse.Group>
      </Grid>
    </Grid.Container>
    </Container>  
    <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Cronograma
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type='text'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo do Cronograma"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            type='date'
            value={data}
            onChange={(e) => setData(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo do Cronograma"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Textarea
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            label="Corpo do Cronograma"
            placeholder="Detalhes do Cronograma"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Cancelar
          </Button>
          <Button auto onPress={saveCronograma}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleEditar}
        onClose={() => setVisibleEditar(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Editar Cronograma
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type='text'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo do Cronograma"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            type='date'
            value={data}
            onChange={(e) => setData(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo do Cronograma"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Textarea
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            label="Corpo do Cronograma"
            placeholder="Detalhes do Cronograma"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisibleEditar(false)}>
            Cancelar
          </Button>
          <Button auto onPress={() => editCronogramaConfirm(idd4)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>  
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleRemover}
        onClose={() => setVisibleRemover(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Remover Cronograma
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Text b size={18}>
              Tem certeza que deseja remover o cronograma com titulo {titulo}
            </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => setVisibleRemover(false)}>
            Cancelar
          </Button>
          <Button auto flat color="error" onPress={() => deletePadrinho(idd4)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>   
    </Profile>
  )
}

export default Dashboard
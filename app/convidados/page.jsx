'use client';
import Profile from '@app/profile/page';
import React, { useState, useEffect } from 'react';
import { Button, Loading, Textarea, Card, Row, Text, Modal, Input, Dropdown, Avatar, Grid, Spacer, Col, Progress, Collapse, Table, Tooltip, User } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Mail } from "./Mail";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const linkG = process.env.NEXTAUTH_URL;

function Convidados() {
  let textoVariavel = "";
  let users = [];
  const router = useRouter();
  const {data: session } = useSession();
  const [visible, setVisible] = useState(false);
  const [visibleMesa, setVisibleMesa] = useState(false);
  const [visiblePadrinho, setVisiblePadrinho] = useState(false);
  const [visibleDetalhes, setVisibleDetalhes] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);
  const [visibleRemover, setVisibleRemover] = useState(false);
  const [iDDD, setIDDD] = useState(false);
  const [grupo, setGrupo] = useState('');
  const [mesa, setMesa] = useState('');
  const [nomeConvidado, setNomeConvidado] = useState('');
  const [emailConvidado, setEmailConvidado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('pendente');
  const [grupos, setGrupos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [padrinhos, setPadrinhos] = useState([]);
  const [damas, setDamas] = useState([]);
  const [cavalheiros, setCavalheros] = useState([]);
  const [protocolos, setProtocolos] = useState([]);
  const [outros, setOutros] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [selected, setSelected] = React.useState(new Set(["grupos"]));
  const [selectedMesas, setSelectedMesas] = React.useState(new Set(["mesas"]));
  const [selectedMesasTipoConvidado, setSelectedMesasTipoConvidado] = React.useState(new Set(["tipo convidado"]));

  

  let selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  let selectedValueMesas = React.useMemo(
    () => Array.from(selectedMesas).join(", ").replaceAll("_", " "),
    [selectedMesas]
  );
  let selectedValueTipoConvidado = React.useMemo(
    () => Array.from(selectedMesasTipoConvidado).join(", ").replaceAll("_", " "),
    [selectedMesasTipoConvidado]
  );
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/todoGrupos/${session?.user.id}/grupos`);
      const data = await response.json();
      console.log(data)
      setGrupos(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/todaMesas/${session?.user.id}/mesas`);
      const data = await response.json();

      setMesas(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.tipoConvidado === "Padrinho") {
            volatel.push(
              {
                id: padrinho._id,
                name: padrinho.nomeConvidado,
                role: padrinho.grupo,
                team: padrinho.mesa,
                status: padrinho.status,
                age: padrinho.mensagem,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                email: padrinho.emailConvidado,
              },
            );
          }          
        })  
        setPadrinhos(volatel);  
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.tipoConvidado === "Dama") {
            volatel.push(
              {
                id: padrinho._id,
                name: padrinho.nomeConvidado,
                role: padrinho.grupo,
                team: padrinho.mesa,
                status: padrinho.status,
                age: padrinho.mensagem,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                email: padrinho.emailConvidado,
              },
            );
          }          
        })  
        setDamas(volatel);  
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.tipoConvidado === "Cavalheiro") {
            volatel.push(
              {
                id: padrinho._id,
                name: padrinho.nomeConvidado,
                role: padrinho.grupo,
                team: padrinho.mesa,
                status: padrinho.status,
                age: padrinho.mensagem,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                email: padrinho.emailConvidado,
              },
            );
          }          
        })  
        setCavalheros(volatel);  
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.tipoConvidado === "Protocolo") {
            volatel.push(
              {
                id: padrinho._id,
                name: padrinho.nomeConvidado,
                role: padrinho.grupo,
                team: padrinho.mesa,
                status: padrinho.status,
                age: padrinho.mensagem,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                email: padrinho.emailConvidado,
              },
            );
          }          
        })  
        setProtocolos(volatel);  
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);
  useEffect(() => {
    let volatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.tipoConvidado === "Outros") {
            volatel.push(
              {
                id: padrinho._id,
                name: padrinho.nomeConvidado,
                role: padrinho.grupo,
                team: padrinho.mesa,
                status: padrinho.status,
                age: padrinho.mensagem,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                email: padrinho.emailConvidado,
              },
            );
          }          
        })  
        setOutros(volatel);  
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);
  const closeHandler = () => {
    setVisible(false);
  };
  const closeHandlerMesa = () => {
    setVisibleMesa(false);
  };
  const closeHandlerPadrinho = () => {
    setVisiblePadrinho(false);
  };
  function visiblePadrinhosPopUp() {
    textoVariavel = 'Adicionar Padrinho';
      setNomeConvidado('');
        setEmailConvidado('');
        setMensagem('');
        setGrupo('');
        setMesa('');
    setVisiblePadrinho(true);
  }
  async function saveGrupo() {
    setVisible(false);
    setProcessando(true);
    try {
      const response = await fetch('api/grupos/new', {
          method: 'POST',
          body: JSON.stringify({
              grupo: grupo,
              userId: session?.user.id,
          })
      })
      if (response.ok) {
          router.push('/convidados');
      }
  } catch (error) {
      console.log(error); 
    }finally {
      setProcessando(false);
      router.push('/convidados');
    }
  }
  async function saveMesa() {
    setVisibleMesa(false);
    setProcessando(true);
    try {
      const response = await fetch('api/mesas/new', {
          method: 'POST',
          body: JSON.stringify({
            mesa: mesa,
              userId: session?.user.id,
          })
      })
      if (response.ok) {
          router.push('/convidados');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/convidados');
    }
  }
  async function savePadrinho() {
    setVisiblePadrinho(false);
    setProcessando(true);
    try {
      const response = await fetch('api/padrinho/new', {
          method: 'POST',
          body: JSON.stringify({
            mensagem,
            nomeConvidado,
            emailConvidado,
            grupo: selectedValue,
            mesa: selectedValueMesas,
            tipoConvidado: selectedValueTipoConvidado,
            userId: session?.user.id,
          })
      })
      if (response.ok) {
          router.push('/convidados');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/convidados');
    }
  }

  async function editPadrinho(iDD2) {
    setVisibleEditar(false);
    setProcessando(true);
    try {
      const response = await fetch(`api/padrinho/${iDD2}`, {
          method: 'PATCH',
          body: JSON.stringify({
            mensagem,
            nomeConvidado,
            emailConvidado,
            grupo: selectedValue,
            mesa: selectedValueMesas,
            tipoConvidado: selectedValueTipoConvidado,
            userId: session?.user.id,
            status,
          })
      })
      if (response.ok) {
          router.push('/convidados');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/convidados');
    }
  }

  async function deletePadrinho(iDD2) {
    setVisibleRemover(false);
    setProcessando(true);
    try {
      const response = await fetch(`api/padrinho/${iDD2}`, {
          method: 'DELETE',
          
      })
      if (response.ok) {
          router.push('/convidados');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/convidados');
    }
  }
  function editarConvidado(iD) {
    padrinhos.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setStatus(padrinho.status);
        setIDDD(iD)   
      }
      damas.map((padrinho) => {
        if (padrinho.id === iD) {
          setNomeConvidado(padrinho.name);
          setEmailConvidado(padrinho.email);
          setMensagem(padrinho.age);
          setGrupo(padrinho.role);
          setMesa(padrinho.team);
          setIDDD(padrinho.id);
          
        }      
      })
      cavalheiros.map((padrinho) => {
        if (padrinho.id === iD) {
          setNomeConvidado(padrinho.name);
          setEmailConvidado(padrinho.email);
          setMensagem(padrinho.age);
          setGrupo(padrinho.role);
          setMesa(padrinho.team);
          setIDDD(padrinho.id);
          
        }      
      })
      protocolos.map((padrinho) => {
        if (padrinho.id === iD) {
          setNomeConvidado(padrinho.name);
          setEmailConvidado(padrinho.email);
          setMensagem(padrinho.age);
          setGrupo(padrinho.role);
          setMesa(padrinho.team);
          setIDDD(padrinho.id);
          
        }      
      })
      outros.map((padrinho) => {
        if (padrinho.id === iD) {
          setNomeConvidado(padrinho.name);
          setEmailConvidado(padrinho.email);
          setMensagem(padrinho.age);
          setGrupo(padrinho.role);
          setMesa(padrinho.team);
          setIDDD(padrinho.id);
          
        }      
      })      
    })
    setVisibleEditar(true);
  }

  function removerConvidado(iD) {
    padrinhos.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(iD);     
      }      
    })
    damas.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    cavalheiros.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    protocolos.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    outros.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    setVisibleRemover(true);
  }
  const closeHandlerEditar = () => {
    setVisibleEditar(false);
  };
  const closeHandlerRemover = () => {
    setVisibleRemover(false);
  };

  function handleVerPadrinho(iD) {
    padrinhos.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    damas.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    cavalheiros.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    protocolos.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    outros.map((padrinho) => {
      if (padrinho.id === iD) {
        setNomeConvidado(padrinho.name);
        setEmailConvidado(padrinho.email);
        setMensagem(padrinho.age);
        setGrupo(padrinho.role);
        setMesa(padrinho.team);
        setIDDD(padrinho.id);
        
      }      
    })
    setVisibleDetalhes(true);
  }
  function closeDetalhes() {
    setVisibleDetalhes(false);
  }
  const columns = [
    { name: "NOME DO CONVIDADO", uid: "name" },
    { name: "GRUPO/MESA", uid: "role" },
    { name: "STATUS CONVITE", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Detalhes do Convidado">
                <IconButton onClick={() => handleVerPadrinho(user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Editar Convidado">
                <IconButton onClick={() => editarConvidado(user.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Remover Convidado"
                color="error"
                onClick={() => removerConvidado(user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Profile>
      {processando && (
        <div className='justify-center items-center'>
        <Grid.Container gap={2}>
        <Grid>
          <Loading color="warning">Processando...</Loading>
        </Grid>
      </Grid.Container>
      </div> 
      )}
           
      <Card>
          <div className='justify-center items-center'>
            <Card.Body>
              <Grid.Container gap={2}>
                <Grid>
                  <Button onPress={() => setVisible(true)} bordered color="gradient" auto>
                    + Grupos
                  </Button>
                </Grid>
                <Grid>
                  <Button onPress={() => setVisibleMesa(true)} bordered color="gradient" auto>
                    + Mesas
                  </Button>
                </Grid>
                <Grid>
                  <Button onPress={visiblePadrinhosPopUp} bordered color="gradient" auto>
                    + Convidado
                  </Button>
                </Grid>
                
              </Grid.Container>
          </Card.Body>
        </div>
      </Card>
      <Spacer y={2} />
      <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Padrinhos</span>
      <Spacer y={1} />
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={padrinhos}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <Spacer y={1} />
    <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Damas</span>
      <Spacer y={1} />
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={damas}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <Spacer y={1} />
    <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Cavalheiros</span>
      <Spacer y={1} />
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={cavalheiros}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <Spacer y={1} />
    <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Protocolos</span>
      <Spacer y={1} />
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={protocolos}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <Spacer y={1} />
    <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Outros</span>
      <Spacer y={1} />
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={outros}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Grupos
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nome do Grupo"
            contentLeft={<Mail fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Cancelar
          </Button>
          <Button auto onPress={saveGrupo}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>   
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleMesa}
        onClose={closeHandlerMesa}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Mesas
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nome da Mesa"
            contentLeft={<Mail fill="currentColor" />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerMesa}>
            Cancelar
          </Button>
          <Button auto onPress={saveMesa}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>   
      {/* Inicio Padrinhos */}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visiblePadrinho}
        onClose={closeHandlerPadrinho}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              {textoVariavel}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type='text'
            value={nomeConvidado}
            onChange={(e) => setNomeConvidado(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nome do Convidado"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            type='email'
            value={emailConvidado}
            onChange={(e) => setEmailConvidado(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email do Convidado"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValueTipoConvidado}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Tipo Convidado"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedMesasTipoConvidado}
              onSelectionChange={setSelectedMesasTipoConvidado}
            >
              <Dropdown.Item key="Padrinho">Padrinho</Dropdown.Item>
              <Dropdown.Item key="Dama">Dama</Dropdown.Item>
              <Dropdown.Item key="Cavalheiro">Cavalheiro</Dropdown.Item>
              <Dropdown.Item key="Protocolo">Protocolo</Dropdown.Item>
              <Dropdown.Item key="Outros">Outros</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Gropos"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              {grupos?.length > 0 && grupos?.map((grup) => 
                 <Dropdown.Item key={grup.grupo}>{grup.grupo}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValueMesas}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Mesas"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedMesas}
              onSelectionChange={setSelectedMesas}
            >
              {mesas.length > 0 && mesas.map((mes) => 
                 <Dropdown.Item key={mes.mesa}>{mes.mesa}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Textarea
            label="Mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva uma mensagem de motivação para o seu convidado"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerPadrinho}>
            Cancelar
          </Button>
          <Button auto onPress={savePadrinho}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>  
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleDetalhes}
        onClose={closeDetalhes}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Detalhes de {nomeConvidado}
            </Text> 
          </Text>
        </Modal.Header>
        <Modal.Body>
          <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Link do Convite: http://localhost:3000/confirmarPresenca/{iDDD}</span>
          <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Mesa: {mesa}</span>
          <span className='font-satoshi font-semibold text-base text-gray-700 p-1'>Grupo: {grupo}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={closeDetalhes}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> 
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleEditar}
        onClose={closeHandlerEditar}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              {textoVariavel}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type='text'
            value={nomeConvidado}
            onChange={(e) => setNomeConvidado(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Nome do Padrinho"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            type='email'
            value={emailConvidado}
            onChange={(e) => setEmailConvidado(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email do Padrinho"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Gropos"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              {grupos?.length > 0 && grupos?.map((grup) => 
                 <Dropdown.Item key={grup.grupo}>{grup.grupo}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValueMesas}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Mesas"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedMesas}
              onSelectionChange={setSelectedMesas}
            >
              {mesas.length > 0 && mesas.map((mes) => 
                 <Dropdown.Item key={mes.mesa}>{mes.mesa}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Textarea
            label="Mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva uma mensagem de motivação para o seu convidado"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerEditar}>
            Cancelar
          </Button>
          <Button auto onPress={() => editPadrinho(iDDD)}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal> 
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleRemover}
        onClose={closeHandlerRemover}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Remover Convidado
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <p>Remover {nomeConvidado}?</p>
        </Modal.Body>
        <Modal.Footer>          
          <Button auto onPress={closeHandlerRemover}>
          Cancelar
          </Button>
          <Button auto flat color="error" onPress={() => deletePadrinho(iDDD)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal> 
      {/* Fim Padrinhos */} 
    </Profile>
  )
}

export default Convidados
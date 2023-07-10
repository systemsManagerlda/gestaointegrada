'use client';
import Profile from '@app/profile/page';
import { Card, Col, Row, Button, Text, Grid, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import { Card5 } from './Card5';
import { Card1 } from './Card1';
import { Card2 } from './Card2';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function Convites() {
  const [processando, setProcessando] = useState(false);
  const [convidadosConfirmados, setConvidadosConfirmados] = useState(0);
  const {data: session } = useSession();
  const [conviteSelect, setConvitesSelect] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/convites/${session?.user.id}/convite`);
      const data = await response.json();
      
      data.map((padrinho) => {
        console.log(padrinho);
        setConvitesSelect(data);
      })
    }
    
    if(session?.user.id) fetchPosts();
    
  },[]);
  
  useEffect(() => {
    let volatel = 0;
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosPadrinhos/${session?.user.id}/padrinhos`);
      const data = await response.json();
      if (data.length != 0) {
        data.map((padrinho) => {
          if (padrinho.status === "confirmado") {          
            setConvidadosConfirmados((prev) => parseInt(prev) + 1)
          }
        });
        
      }         
    }
    if(session?.user.id) fetchPosts();
  },[]);

  async function deletePadrinho(iDD2) {
    setProcessando(true);
    try {
      const response = await fetch(`api/convites/${iDD2}`, {
          method: 'DELETE',
          
      })
      if (response.ok) {
          router.push('/convites');
      }
  } catch (error) {
      console.log(error);
    }finally {
      setProcessando(false);
      router.push('/convites');
    }
  }
  return (
    <Profile>
      <Card>
          <div className='justify-center items-center'>
            <Card.Body>
              <Grid.Container gap={2}>
              {processando && (
                    <div className='justify-center items-center'>
                    <Grid.Container gap={2}>
                    <Grid>
                    <Loading color="warning"></Loading>
                    </Grid>
                </Grid.Container>
                </div> 
                )}
                <Grid>
                  <div>
                    {conviteSelect.length > 0 && conviteSelect.map((conv) => <>Convite Selecionado: {conv.modelo} | Confirmados: {convidadosConfirmados} | Preço Total: {parseInt(convidadosConfirmados)*parseInt(conv.preco)},00 Mt 
                    <Button onClick={() => deletePadrinho(conv._id)} bordered color="gradient" auto>
                  Remover
                  </Button></>)}
                    
                  </div>
                </Grid>
              </Grid.Container>
          </Card.Body>
        </div>
      </Card>
      <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={12}>
        <Card5 />
        <Card1 />
        <Card2 />
      </Grid>
    </Grid.Container>   
    </Profile>
  )
}

export default Convites
import { Card, Col, Row, Button, Text, Grid, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function Card2() {
    const [processando, setProcessando] = useState(false);
    const [modelo, setModelo] = useState('al23a');
    const [preco, setPreco] = useState('250');
    const {data: session } = useSession();
    const router = useRouter();


    async function saveConvite() {
        setProcessando(true);
        try {
          const response = await fetch('api/convites/new', {
              method: 'POST',
              body: JSON.stringify({
                modelo,
                preco,
                userId: session?.user.id,
              })
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
  <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#FFA500">
          Convite de Casamento
        </Text>
        <Text h3 color="#FFA500">
         Clássico
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={"/assets/images/convite2.png"}
        objectFit="cover"
        width="90%"
        height="90%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col>
              <Text color="#FFA500" size={12}>
                Preço Unitário: 250,00 Mt
              </Text>
              {processando && (
                    <div className='justify-center items-center'>
                    <Grid.Container gap={2}>
                    <Grid>
                    <Loading color="warning"></Loading>
                    </Grid>
                </Grid.Container>
                </div> 
                )}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
                onClick={saveConvite}
              flat
              auto
              rounded
              css={{ color: "#FFA500", bg: "#FAC898" }}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Comprar
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);}
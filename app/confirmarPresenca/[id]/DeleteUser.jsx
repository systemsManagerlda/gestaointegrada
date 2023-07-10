import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

export const DeleteUser = () => {
  return (
    <Grid.Container
      css={{
        borderRadius: "14px",
        padding: "0.75rem",
        maxWidth: "330px",
      }}
    >
      <Row justify="center" align="center">
        <Text b>Solicitar Convite</Text>
      </Row>
      <Row>
        <Text>
          Ao solicitar o seu convite, o mesmo lhe sera enviado(a) atraves do seu email!
           Sera notificado dentro em breve... A sua presenca e' escencial para o sucesso deste evento!
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button size="sm" light>
            Cancelar
          </Button>
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error">
            Solicitar
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
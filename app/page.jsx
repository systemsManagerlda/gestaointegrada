import React from "react";
import Feed from "../components/Feed";



function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
           Systems Manager
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center"> Sistema de Gestão Integrado</span>
        </h1>
        <p className="desc text-center">
        O Sistema Integrado de Gestão Empresarial (SIGE) da 
        Systems Manager é uma solução abrangente que visa 
        facilitar e otimizar as operações diárias das empresas. 
        Com uma ampla gama de serviços, o SIGE oferece diversas 
        ferramentas essenciais para a gestão eficiente dos negócios, 
        incluindo Gestão de Filas, Marcação de Presenças e Registro 
        de Reclamações.</p>
      <Feed />
    </section>
  )
}

export default Home
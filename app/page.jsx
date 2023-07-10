import React from "react";
import Feed from "../components/Feed";



function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Gestão de Eventos
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> Uma nova forma de festejar</span>
        </h1>
        <p className="desc text-center">Bem-vindo à nossa página de gestão de eventos! 
        Aqui, oferecemos orientações e recursos para ajudá-lo a planejar e executar eventos 
        com excelência e segurança. Nossa equipe está comprometida em fornecer diretrizes 
        atualizadas e melhores práticas para garantir que seu evento seja um sucesso. 
        Desde a escolha do local adequado até a comunicação eficaz com os participantes, 
        estamos aqui para oferecer suporte em todas as etapas do processo. Contamos com 
        soluções inovadoras e adaptáveis para atender às necessidades específicas do seu evento. 
        Vamos trabalhar juntos para criar experiências inesquecíveis!</p>
      <Feed />
    </section>
  )
}

export default Home
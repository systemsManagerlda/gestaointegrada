'use client';
import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from "@components/Form";

function CreateEvento() {
    const router = useRouter();
    const {data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [evento, setEvento] = useState({
        nomeNoiva: '',
        nomeNoivo: '',
        localEvento: '',
        dataEvento: '',
        orcamentoInicial: '',
    })
    const createEvento = async (e) => {
        e.preventDefault();
        setSubmitting(true); 
        try {
            const response = await fetch('api/eventos/new', {
                method: 'POST',
                body: JSON.stringify({
                    nomeNoiva: evento.nomeNoiva,
                    nomeNoivo: evento.nomeNoivo,
                    localEvento: evento.localEvento,
                    dataEvento: evento.dataEvento,
                    orcamentoInicial: evento.orcamentoInicial,
                    userId: session?.user.id,
                })
            })
            if (response.ok) {
                router.push('/dashboard/dasPage');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <Form 
        type="Criar"
        evento={evento}
        setEvento={setEvento}
        submitting={submitting}
        handleSubmit={createEvento}
    />
  )
}

export default CreateEvento
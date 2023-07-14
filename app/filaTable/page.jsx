'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

function FilaTable() {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink + ' bg-primary-orange rounded-lg text-white';
  const router = useRouter();
  const pathname = usePathname();
  const [filas, setFilas] = useState([]);
  const {data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/filas`);
      const data = await response.json();
      console.log(data) 
      setFilas(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  return (
        <div className='glassmorphism  flex-grow'>
            <div class="flex space-x-4">
                <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Fila de Espera:</span>
                <Button onPress={() => router.push('/filas')} size="sm">Add Serviço</Button>
            </div>         
          
          <div className='overflow-auto rounded-lg shadow mt-4'>
            <table className='w-full'>
                <thead className='bg-blue-100 border=b-2 border-blue-200'>
                    <tr>
                        <th className='w-20 p-3 text-sm font-semibold tracking-wide text-letf'>N.</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-letf'>Nome do Cliente</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-letf'>Nome do Serviço</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-letf'>Preço</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-letf'>Funcionário</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-letf'>Data/Hora</th>
                        <th className='w-24 p-3 text-sm font-semibold tracking-wide text-letf'>Status</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gra'>
                    {filas.length > 0 && filas.map((fila, index) => (
                        <>
                        {(fila.status === "Não Atendido") && (
                          <tr className='bg-white'>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{index + 1}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{fila.cliente}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{fila.nomeServico}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{fila.precoServico}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{fila.funcionario}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'>{fila.dataHora}</td>
                            <td className='whitespace-nowrap p-3 text-sm text-gray-700'><span className='p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-800 rounded-lg bg-opacity-40'>{fila.status}</span></td>
                        </tr> 
                        )}                           
                        </>
                    ))}                        
                </tbody>
            </table>
          </div>
      </div>    
  )
}

export default FilaTable
'use client';

import Profile from '@app/profile/page'
import React, { useState, useEffect } from 'react';

function ProdutosServicos() {
 const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/protudosTodos`);
      const data = await response.json();
      console.log(data)
      setProdutos(data);
    }
    fetchPosts();
  },[]);
  return (
    <Profile>
      <p>Produtos e Servicos</p>     
    </Profile>
  )
}

export default ProdutosServicos
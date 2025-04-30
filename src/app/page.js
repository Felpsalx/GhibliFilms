'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { memo, useState } from 'react'
import { Star } from 'lucide-react'
import Link from 'next/link'
import SearchBar from '../app/components/searchbar'
import Carregando from '../app/components/loading'
import Erro from '../app/components/erro'

const fetchFilmes = async () => {
  const res = await axios.get('https://ghibliapi.vercel.app/films')
  return res.data
}

function ListMovie() {
  const [pesquisa, setPesquisa] = useState('')
  const { data: filmes = [], isLoading, error } = useQuery({
    queryKey: ['filmes'],
    queryFn: fetchFilmes,
  })


  const filteredFilmes = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(pesquisa.toLowerCase())
  )

  if (isLoading) return <Carregando />
  if (error) return <Erro />

  return (
    <div className="container mx-auto px-4 mt-5 mb-5">
      <header className='flex justify-between text-xl mb-4 items-center border-b-amber-300 border-b-2 pb-4'>
        <h1 className='text-4xl font-bold uppercase tracking-wider'>Ghibli <span className='bg-amber-300 px-1 rounded-xs text-black shadow-[7px_7px_0px_0px_rgba(124,45,18,0.4)]'>Tv Show</span></h1>
        <SearchBar searchTerm={pesquisa} setSearchTerm={setPesquisa} />
      </header>

      <div className="grid grid-cols-3 gap-8">
        {filteredFilmes.length > 0 ? (
          filteredFilmes.map((filme) => (
            <Link href={`/movies/${filme.id}`} key={filme.id} className="p-2 rounded shadow-[5px_5px_2px_0px_#111827] bg-amber-200">
              <img src={filme.image} className="w-full h-auto rounded" alt={filme.title} />
              <div className="font-bold flex space-x-3.5 justify-between items-center mt-4 text-2xl text-black">
                <h2>{filme.title}</h2>
                <div className="flex items-center space-x-1.5">
                  <Star className="text-black" />
                  <p>{(filme.rt_score / 10).toFixed(1)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Nenhum resultado encontrado para {pesquisa}.</p>
        )}
      </div>
    </div>
  )
}

export default memo(ListMovie)

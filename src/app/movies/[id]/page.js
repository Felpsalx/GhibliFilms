import axios from "axios";
import Link from "next/link";
import { Star, User, ArrowLeft } from "lucide-react";
import { memo } from "react";
async function FilmePage({ params }) {
    const { id } = params;
  
    const res = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
    const filme = res.data;

    const pessoas = await Promise.all(
        filme.people
          .filter(url => url !== "https://ghibliapi.vercel.app/people/") // filtra urls "vazias"
          .map(async (url) => {
            const res = await axios.get(url);
            return res.data;
          })
      );
    return (
        
      <div className=" px-4 py-6 bg-gradient-to-tl from-amber-900  to-amber-400  h-screen w-screen text-black">
        <div>
            <div className="flex space-x-3">
                <Link href="/" className="bg-amber-300 p-2 rounded inline-block h-fit  font-bold shadow-[3px_3px_2px_0px_rgba(124,45,18,0.4)]">
                    <div className="flex items-center space-x-2">
                        <ArrowLeft />
                        <p>Back</p>
                    </div>
                </Link>
                <h1 className="text-3xl font-bold mb-4">{filme.title}</h1>
            </div>
            <div className="flex">
                <img src={filme.movie_banner} className="w-full max-h-96 rounded mb-4 shadow-[7px_7px_8px_4px_rgba(124,45,18,0.4)]" />
                <div className="text-lg ml-3">
                    <p className="mb-3 tracking-wider">{filme.description}</p>
                    <div className="flex space-x-3">
                        <p>Director: {filme.director}</p>
                        <p>Producer: {filme.producer}</p>
                        <p>Release: {filme.release_date}</p>
                    </div>
                    <div className="text-orange-800 font-bold flex space-x-3.5 items-center mt-4">
                        <Star />
                        <p>Rating: {(filme.rt_score / 10).toFixed(1)} </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <User />
                <h2 className="font-bold text-2xl">Peoples: </h2>
            </div>
            <div className="flex">
                {pessoas.map((people, index)=>(
                    <div key={people.id} className="mr-3">
                        <h3 className="font-light text-sm mt-2">{people.name}
                        {index < pessoas.length - 1 && ','}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }

export default memo(FilmePage)
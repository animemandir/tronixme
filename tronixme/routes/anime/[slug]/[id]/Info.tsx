import { useRouter } from "next/router";
import useSWR from "swr";

export default function Info() {
    const { slug } = useRouter().query;
    const { data } = useSWR<Anime>(`/anime/${slug}`); 

    return (

    )
}
import Image from "next/image";
import { Poppins } from 'next/font/google';
import Link from 'next/link'
import Trynow from '../components/Trynow'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Home() {
  return (
    <div className="flex justify-between bg-purple-200">
      <div className="p-2 flex flex-col font-bold justify-center items-center  h-80">
        <p className={`text-xl ${poppins.className}`}>The best URL shortener</p>
        <p className={`text-md px-42 text-center  ${poppins.className}`}>
          We are the straightforward URL shortener in the world.
          We just focus on the work rather than time wasting.
        </p>
        <div className="flex gap-3 text-center text-white mt-4">
                    {/* <Link href="/Shorten"><button className="bg-purple-500 shadow-lg rounded-lg px-2 py-1" >Try now</button></Link> */}
                    <Trynow/>
                             <Link href="/Shorten"><button className="bg-purple-500 shadow-lg rounded-lg px-2 py-1" >Github</button></Link>

        </div>

      </div>
      <div>
        <Image className="mix-blend-darken" src="/vector.png" width={300} height={300} alt="vector img" />
      </div>

    </div>
  );
}

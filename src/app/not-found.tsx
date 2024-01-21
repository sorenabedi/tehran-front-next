import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-dvh w-full flex justify-center items-center'>
      <Link href='/'>Return Home</Link>
    </div>
  );
}

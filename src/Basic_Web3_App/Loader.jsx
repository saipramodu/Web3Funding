export default function Loader() {
  //This is to create a loader animation
  return (
    <div className='flex justify-center items-center p-3'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-700'></div>
    </div>
  );
}

/*
Tailwind 

animate-spin - rotates infinitely

rounded-full h-32 w-32 - as h and w are same the div becomes a round

*/

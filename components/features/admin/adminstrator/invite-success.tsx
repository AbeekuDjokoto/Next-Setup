import Image from 'next/image';

function InviteSuccess() {
  return (
    <div className="flex flex-col justify-center items-center w-[350px] bg-white gap-4 p-10 rounded-md">
      <Image src={'/assets/images/invite-success.png'} width={70} height={70} alt="" />
      <h2 className="text-2xl font-bold text-center">Admin Created Sucessfully</h2>
      {/* <p className="text-gray-500 text-center">
        Your invite to <strong>John Doe</strong> was successful
      </p> */}
    </div>
  );
}

export { InviteSuccess };

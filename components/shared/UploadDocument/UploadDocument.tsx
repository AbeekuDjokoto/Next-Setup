import { useVerificationDoc } from '@/hooks/user';
import Image from 'next/image';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { DropFile } from '../DropFile';
import { Button, Icons } from '@/components/shared';

interface Props {
  closeModal: any;
}
export function UploadDocument({ closeModal }: Props) {
  const { files, setFiles, handleVerificationDoc, isPending } = useVerificationDoc();
  const acceptableFileTypes = {
    'image/*': ['.jpeg', '.png'],
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    'application/msword': [],
  };

  function removeDoc(fileName: string) {
    setFiles((prev: any) => {
      return prev.filter((file: any) => file.name !== fileName);
    });
  }

  return (
    <div className="w-[560px] max-w-full p-4 grid gap-4 bg-white rounded-md">
      <div className="p-4 border rounded-md grid gap-4">
        <h2 className="font-bold text-lg">Add a new Document to be Verified</h2>

        <DropFile accept={acceptableFileTypes} setFiles={setFiles} />

        <div className="flex items-center gap-4">
          {files?.map((file: any) => {
            const url = URL.createObjectURL(file);
            return (
              <div className="relative">
                {file.type === 'image/png' ? (
                  <Image key={file?.name} src={url} alt={file?.name} width={50} height={50} />
                ) : (
                  <embed src={url} width="50" height="50"></embed>
                )}

                <CloseIcon
                  className="absolute right-[-8px] top-[-8px] cursor-pointer"
                  onClick={() => removeDoc(file.name)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant={'outline'} onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={handleVerificationDoc}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Upload docs
        </Button>
      </div>
    </div>
  );
}

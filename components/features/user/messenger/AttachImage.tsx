// set initial state for the object
import { storage } from '@/config/firebase';

import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { PaperclipIcon } from 'lucide-react';
import React from 'react';

export function AttachImage() {
  const [data, setData] = React.useState<any>({});
  // call setfile on file input onChange
  const [file, setFile] = React.useState<any>(null);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = () => {
    //By creating a reference to a file, your app gains access to it.
    const storageRef = ref(storage, file?.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload paused');
            break;
          case 'running':
            console.log('Upload running');
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
          // you keep uploaded img url
          setData((prev: any) => ({ ...prev, img: downloadedURL }));
        });
      },
    );
  };

  return (
    <>
      <label htmlFor="attachment">
        <PaperclipIcon className="text-gray-500" />
        <input id="attachment" type="file" className="hidden" onChange={handleChange} />
      </label>
      <button onClick={uploadFile}>upload</button>
    </>
  );
}

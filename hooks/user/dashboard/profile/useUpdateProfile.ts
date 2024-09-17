import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProfile(uploadedImage: any, imageUploader: any) {
  const { successToast, errorToast } = useToastify();

  const { mutate } = useMutation({
    mutationFn: (formData: any) => {
      return httpClient.put('/user/image', formData);
    },
    onSuccess: async (data) => {
      successToast('Profile image updated');
    },
    onError: async (data) => {
      errorToast('Failed to update profile image');
    },
  });

  const handleImageUpload = async (e: any) => {
    const [file] = e?.target?.files;

    if (file) {
      const { current } = uploadedImage;
      current.src = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('image', file);

      mutate(formData);
    }
  };
  return {
    handleImageUpload,
  };
}

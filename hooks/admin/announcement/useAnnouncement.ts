import { httpClient } from '@/config';
import { useModal, useToastify } from '@/hooks/shared';
import { useMutation } from '@tanstack/react-query';

export function useAnnouncement() {
  var { successToast, errorToast } = useToastify();
  var { showModal, closeModal, openModal, contentType } = useModal();

  var { mutate: onSendNotification, isPending: isLoadingSendNotification } = useMutation({
    mutationFn: (data: object) => {
      return httpClient.post('/admin/notification', data);
    },
    onSuccess: async () => {
      closeModal();
      successToast('Nofication send successfully');
    },
    onError: async () => {
      errorToast('Error sending notification, try again');
    },
  });

  var PUBLIC_API = {
    onSendNotification,
    isLoadingSendNotification,
    showModal,
    closeModal,
    openModal,
    contentType,
  };

  return PUBLIC_API;
}

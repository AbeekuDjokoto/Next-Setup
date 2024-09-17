import { useClients } from '.';

export function useSingleUser(user_id: string | string[]) {
  const { users, isLoadingUsers } = useClients(1000);

  // * Ensure user_id is a string
  const id = Array.isArray(user_id) ? user_id[0] : user_id;

  return {
    user: users.find((user) => user.id === Number(id)),
    isLoading: isLoadingUsers,
  };
}

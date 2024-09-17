import { AddPropertyEmpty } from './AddPropertyEmpty';
import EmptyStateIcon from '@/public/assets/icons/empty-state.svg';
interface Props {
  type?: string;
  openModal?: any;
  message?: string;
}

function EmptyState({ type, openModal, message }: Props) {
  if (type) {
    return <>{type === 'add-property' && <AddPropertyEmpty openModal={openModal} />}</>;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyStateIcon className="w-[125px] h-[125px]" />
      <p className="text-center text-gray-500 font-medium">{message || 'No Data Found'}</p>
    </div>
  );
}

export { EmptyState };

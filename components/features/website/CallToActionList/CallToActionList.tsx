import { CallToActionCard } from './CallToActionCard';

type Props = {
  actions: any[];
};
export function CallToActionList({ actions }: Props) {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-8 items-center justify-center">
      {actions.map((item) => (
        <CallToActionCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          description={item.description}
          btnPath={item.btnPath}
          btnText={item.btnText}
          data={item}
        />
      ))}
    </div>
  );
}

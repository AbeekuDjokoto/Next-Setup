interface Props {
  title: string;
  category: string;
  _createdAt: string;
}

export const BlogDetailsJumbotron = ({ title, category, _createdAt }: Props) => {
  return (
    <div>
      <div className="text-[30px] md:text-[46px] max-w-3xl font-bold">
        <h2>{title}</h2>
      </div>
      <p className="flex gap-5 mt-7">
        <span>{category}</span>
        <span>{_createdAt}</span>
      </p>
    </div>
  );
};

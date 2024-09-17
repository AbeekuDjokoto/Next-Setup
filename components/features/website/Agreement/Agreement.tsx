type Props = {
  terms: {
    id: number;
    title: string;
    content: {
      id: number;
      text: string;
    }[];
  };
};

export function Agreement({ terms }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">
        <span>{`${terms.id}. `}</span>
        {terms.title}
      </h2>
      <div className="grid gap-4">
        {terms.content.map((item, idx) => {
          return (
            <p key={item.id} className="leading-6">
              <strong>{`${terms.id}.${idx + 1} `} </strong>
              {item.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

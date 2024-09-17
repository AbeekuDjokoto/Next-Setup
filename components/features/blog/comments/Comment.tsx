// import Date from './date'

export default function Comments({ comments = [] }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-[32px] font-medium leading-tight">
        Comments
      </h2>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li
            key={_id}
            className="mb-5"
          >
            <hr className="mb-5" />
            <h4 className="mb-2 leading-tight">
              <p className="font-semibold">{name}</p>
            </h4>
            <p>{comment}</p>
            <hr className="mt-5 mb-5" />
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/blog?page=${currentPage - 1}`}>
          <p className="prev">Previous</p>
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/blog?page=${currentPage + 1}`}>
          <p className="next">Next</p>
        </Link>
      )}

      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0;
        }
        .prev,
        .next {
          margin: 0 10px;
          text-decoration: none;
          color: #0070f3;
        }
        .prev:hover,
        .next:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Pagination;

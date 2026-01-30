type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  rows: Record<string, string | number>[];
};

const DataGrid = ({ columns, rows }: Props) => {
  return (
    <div className="data-grid">
      <div className="grid-header">
        {columns.map((column) => (
          <div key={column.key} className="grid-cell header">
            {column.label}
          </div>
        ))}
      </div>
      <div className="grid-filter">
        {columns.map((column) => (
          <div key={column.key} className="grid-cell filter">
            <input placeholder="Filtre" />
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <div key={index} className="grid-row">
          {columns.map((column) => (
            <div key={column.key} className="grid-cell">
              {row[column.key] ?? '-'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataGrid;

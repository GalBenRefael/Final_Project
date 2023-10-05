export const CategorySelect = ({
  onChange,
  className = '',
  value,
  hasAllOption = false,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  className?: string;
  hasAllOption?: boolean;
}) => {
  return (
    <select
      className={`form-select ${className}`}
      aria-label="Default select example"
      onChange={onChange}
      value={value}
    >
      <option selected disabled>
        Selected business category
      </option>
      <option value="Dining">Dining</option>
      <option value="Construction">Construction</option>
      <option value="Electronics">Electronics</option>
      <option value="Leisure">Leisure</option>
      <option value="Flowers">Flowers</option>
      {hasAllOption && <option value="">All</option>}
    </select>
  );
};

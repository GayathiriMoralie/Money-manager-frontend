function Filters({ setFilters }) {
  return (
    <div className="grid md:grid-cols-4 gap-3">
      <select
        className="border p-2 rounded"
        onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
      >
        <option value="">All Categories</option>
        <option>Fuel</option>
        <option>Food</option>
        <option>Movie</option>
        <option>Medical</option>
        <option>Loan</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e => setFilters(f => ({ ...f, division: e.target.value }))}
      >
        <option value="">All Divisions</option>
        <option>Personal</option>
        <option>Office</option>
      </select>

      <input
        type="date"
        className="border p-2 rounded"
        onChange={e => setFilters(f => ({ ...f, from: e.target.value }))}
      />

      <input
        type="date"
        className="border p-2 rounded"
        onChange={e => setFilters(f => ({ ...f, to: e.target.value }))}
      />
    </div>
  );
}

export default Filters;

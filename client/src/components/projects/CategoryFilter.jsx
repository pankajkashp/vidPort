// src/components/projects/CategoryFilter.jsx
import { CATEGORIES } from '../../utils/constants.js';

const CategoryFilter = ({ active, onSelect }) => (
  <div className="w-full overflow-x-auto hide-scrollbar">
    <div className="flex gap-2 pb-2 min-w-max md:flex-wrap md:min-w-0">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`category-pill whitespace-nowrap ${active === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryFilter;


type Props = {
    onFilter: (filter: 'all' | 'active' | 'completed') => void
}

export  const FilterToDo:React.FC<Props> = ({onFilter}) => {

    return (
        <div className="filter-container">
            <label className="filter-label">Filter ToDo</label>
            <button className="btn-filter"
             onClick={() => onFilter('all')}>
                All
                </button>
            <button className="btn-filter"
            onClick={() => onFilter('active')}>
                Active
                </button>
            <button className="btn-filter"
            onClick={() => onFilter('completed')}>
                Completed
            </button>
        </div>
    );
}
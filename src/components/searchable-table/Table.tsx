import { useEffect, useMemo, useState } from 'react';
import './tables.css';
import employees from '../../data/employess.json';

function Table() {
    const [employeeData, setEmployeeData] = useState(employees);
    const [searchData, setSearchData] = useState('');
    const [itemPerPage, setItemPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const itemArr = [10, 20, 30, 50];
    const totalPages = Math.ceil(employeeData.length/itemPerPage);

    function sort(key: string) {
        const sortedEmployees = [...employees].sort((a, b) => {
            const first = String(a[key as keyof typeof a]);
            const second = String(b[key as keyof typeof b]);

            return first.localeCompare(second, undefined, { numeric: true });
        });

        setEmployeeData(sortedEmployees);
    }

    const searchTable = (searchTerm: string) => {
        const filteredEmployees = employees.filter((employee) => {
            return Object.values(employee).some((value) => String(value).toLowerCase().includes(searchTerm));
        });

        setEmployeeData(filteredEmployees);
    }

    const handlePageChange = (page: number) => {
        if (page >= 0 && page < totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    }

    const currentItems = useMemo(() => {
        const abc = (currentPage*itemPerPage);
        const start = abc>0 ? abc : 0;
        const end = start + itemPerPage;

        return employeeData.slice(start, end);
    }, [currentPage, itemPerPage, employeeData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchTable(searchData);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchData]);

    return (
        <>
        <div className='mb-3'>
            <h1>Searchable Table</h1>
            <p>This is a searchable table component.</p>
            <br />

            <div className="flex justify-between m-2">
                <input
                    className='w-2xl'
                    type="text"
                    placeholder="Search..."
                    onChange={(event) => setSearchData(event.target.value.toLowerCase())}
                />

                <div>
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select id="itemsPerPage" value={itemPerPage} onChange={(event) => setItemPerPage(Number(event.target.value))}>
                        {itemArr.map((item) => (
                            <option
                                value={item}
                                key={item}
                            >{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        {Object.keys(employees[0]).map((key) => (
                            <th key={key}>
                                <button className='table-header' onClick={() => sort(key)}>{key}</button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee) => (
                        <tr key={employee.id}>
                            <td key={employee.id}>{employee.id}</td>
                            <td key={employee.name}>{employee.name}</td>
                            <td key={employee.email}>{employee.email}</td>
                            <td key={employee.role}>{employee.role}</td>
                            <td key={employee.department}>{employee.department}</td>
                            <td key={employee.status}>{employee.status}</td>
                            <td key={employee.salary}>{employee.salary}</td>
                            <td key={employee.joiningDate}>{employee.joiningDate}</td>
                            <td key={employee.city}>{employee.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ul className="flex gap-1.5 mt-3 mr-5 justify-end">
                {Array.from({ length: totalPages }, (_, page) => (
                    <li className='border-2 p-2 pt-0 pb-0' key={page}>
                        <button
                            className='pageButton'
                            type="button"
                            aria-current={currentPage === page ? 'page' : undefined}
                            onClick={() => handlePageChange(page)}
                        >
                            {page + 1}
                        </button>
                    </li>
                ))}
            </ul>

        </div>
        </>
    )
}

export default Table;

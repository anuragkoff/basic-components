import { useEffect, useState } from 'react';
import './tables.css';
import employees from '../../data/employess.json';

function Table() {
    const [employeeData, setEmployeeData] = useState(employees);
    const [searchData, setSearchData] = useState('');


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

        console.log('Filtered Employees: Done');

        setEmployeeData(filteredEmployees);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            searchTable(searchData);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchData]);

    return (
        <>
            <div>
                <h1>Searchable Table</h1>
                <p>This is a searchable table component.</p>
            <br /><br />

            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => setSearchData(event.target.value.toLowerCase())}
            />

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
                    {employeeData.map((employee) => (
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
        </div>
    </>
  )
}

export default Table;

import { useEffect, useState } from 'react';
import { Eye, Edit, Trash, RefreshCw } from 'lucide-react';
import { useGetClientsByIdQuery } from '../../../store/api/app/Client/clientApiSlice';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../lib/format';
import { useGetEmployeesByIdQuery } from '../../../store/api/app/Employees/employeesApiSlice';

const EmployeesView = () => {
  const [activeTab, setActiveTab] = useState('payroll');
  const [perPage, setPerPage] = useState(10);

  const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

  const { id } = useParams();

  const { data: viewData, isLoading, isError } = useGetEmployeesByIdQuery(id);
  const employeeData = viewData?.data || {};

  console.log("employeeData::", employeeData);

  const payrolls = employeeData?.payroll || [];
  const salaryIncrements = employeeData?.salaryIncrements || [];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Employee Details</h1>
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li><a href="#" className="text-blue-500">Dashboard</a></li>
              <li><span className="text-gray-500">&gt;</span></li>
              <li><a href="#" className="text-blue-500">Employees</a></li>
              <li><span className="text-gray-500">&gt;</span></li>
              <li><span className="text-gray-700">Details</span></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow col-span-1">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-gray-500 rounded-full flex items-center justify-center text-white mb-4">
                {employeeData?.photo ? (
                  <img src={`${backendUrl}${employeeData?.photo}`} alt="Client" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>No Preview</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{employeeData?.name}</h2>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Emp ID</span>
                <span className="text-gray-800 font-medium">{employeeData?.emp_id}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Department</span>
                <span className="text-gray-800 font-medium">{employeeData?.department?.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Designation</span>
                <span className="text-gray-800 font-medium">{employeeData?.designation}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Contact Number</span>
                <span className="text-gray-800 font-medium">{employeeData?.mobile_number}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Basic Salary</span>
                <span className="text-gray-800 font-medium">{employeeData?.basic_salary}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Current Salary</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.salary}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">common.commision</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.commission}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Gender</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.male}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Blood Group</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.blood_group}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Religion</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.religion}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Birth Date</span>
                <span className="text-gray-800 font-medium text-sm">{formatDate(employeeData?.birth_date)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Join Date</span>
                <span className="text-gray-800 font-medium text-sm">{formatDate(employeeData?.joining_date)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Appointment Date</span>
                <span className="text-gray-800 font-medium text-sm">{formatDate(employeeData?.appointment_date)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Address</span>
                <span className="text-gray-800 font-medium text-sm">{employeeData?.address}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b py-2">
                <span className="text-gray-600">Allow Employee Login</span>
                <span className="text-gray-800 font-medium text-sm">No</span>
              </div>
            </div>

            {
              employeeData?.status === true ? (
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4">
                  Active
                </button>
              ) : (
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-4">
                  Inactivate
                </button>
              )
            }
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="flex border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('payroll')}
                  className={`px-6 py-3 flex items-center space-x-1 ${activeTab === 'payroll' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Payroll</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{payrolls?.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-3 ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                >
                  <span>Increment History</span>
                  <span className="ml-2 text-white bg-black rounded-full px-2 text-xs">{salaryIncrements?.length}</span>
                </button>
              </div>

              <div className="p-4">
                {/* <div className="flex justify-between items-center mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">From - To</span>
                    <button className="p-2 bg-green-500 text-white rounded-md">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div> */}

                <div className="overflow-x-auto">
                  {
                    activeTab === 'payroll' ? (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Salary Month</th>
                            <th className="p-3 text-left">Salary Date</th>
                            <th className="p-3 text-left">Account</th>
                            <th className="p-3 text-left">Total Paid</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payrolls?.map((item, index) => {
                            return (
                              <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 text-blue-500">{item.salary_month}</td>
                                <td className="p-3">{formatDate(item.salary_date)}</td>
                                <td className="p-3">{item.transaction.account.bank_name}</td>
                                <td className="p-3">{formatCurrency(item?.transaction?.amount)}</td>
                                <td className="p-3">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {item.status === true ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <div className="flex space-x-1">
                                    <Link to={`/store/dashboard/payroll/${item.id}`}>
                                      <button className="p-1 bg-blue-500 text-white rounded">
                                        <Eye size={16} />
                                      </button>
                                    </Link>
                                    <Link to={`/store/dashboard/payroll/${item.id}/edit`}>
                                      <button className="p-1 bg-cyan-500 text-white rounded">
                                        <Edit size={16} />
                                      </button>
                                    </Link>
                                    <button className="p-1 bg-red-500 text-white rounded">
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    ) : activeTab === 'history' ? (
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 border-b">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Increment Reason</th>
                            <th className="p-3 text-left">Basic Salary</th>
                            <th className="p-3 text-left">Increment Amount</th>
                            <th className="p-3 text-left">Present Salary</th>
                            <th className="p-3 text-left">Increment Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salaryIncrements?.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3 text-blue-500">{item.reason}</td>
                              <td className="p-3">{item?.employee?.basic_salary}</td>
                              <td className="p-3">{item?.increment_amount}</td>
                              <td className="p-3">{item?.employee?.salary}</td>
                              <td className="p-3">{formatDate(item?.increment_date)}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {item.status === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-1">
                                  <Link to={`/store/dashboard/salary-increments/${item.id}`}>
                                    <button className="p-1 bg-blue-500 text-white rounded">
                                      <Eye size={16} />
                                    </button>
                                  </Link>
                                  <Link to={`/store/dashboard/salary-increments/${item.id}/edit`}>
                                    <button className="p-1 bg-cyan-500 text-white rounded">
                                      <Edit size={16} />
                                    </button>
                                  </Link>
                                  <button className="p-1 bg-red-500 text-white rounded">
                                    <Trash size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : null

                  }

                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    {/* <span className="mr-2 text-gray-600">Per Page</span>
                    <select
                      className="border border-gray-300 rounded p-1"
                      value={perPage}
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select> */}
                  </div>

                  <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700" onClick={() => window.history.back()}>
                    ← Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesView;
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Table from '../../components/shared/Table';
import { FaFileDownload, FaSpinner, FaCheckCircle, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminReports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [formData, setFormData] = useState({
    type: 'All Applications Report',
    from: '',
    to: '',
    format: 'CSV'
  });

  const sampleData = [
    { id: 1, student: "Alice Johnson", company: "Tech Corp", role: "Frontend Intern", status: "Pending", date: "2026-02-07" },
    { id: 2, student: "Bob Smith", company: "Innovate Ltd", role: "Backend Intern", status: "Rejected", date: "2026-02-05" },
    { id: 3, student: "Charlie Brown", company: "Future Systems", role: "DevOps Intern", status: "Accepted", date: "2026-02-01" },
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setReportGenerated(false);

    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success("Report generated successfully!");
    }, 2000);
  };

  return (
    <Layout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Reports</h1>
        <p className="text-gray-600">Export system data for analysis and compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Form */}
        <div className="lg:col-span-1">
          <Card title="Report Configuration">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Type</label>
                <select 
                  className="mt-1 block w-full border rounded-md p-2 text-sm border-gray-300"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>All Applications Report</option>
                  <option>Placements Report</option>
                  <option>Students Summary</option>
                  <option>Companies Summary</option>
                  <option>Monthly Analytics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border rounded-md p-2 text-sm border-gray-300"
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border rounded-md p-2 text-sm border-gray-300"
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                <div className="flex space-x-4">
                  <label className="flex items-center text-sm">
                    <input 
                      type="radio" 
                      name="format" 
                      value="CSV" 
                      checked={formData.format === 'CSV'} 
                      onChange={() => setFormData({...formData, format: 'CSV'})}
                      className="mr-2"
                    /> CSV
                  </label>
                  <label className="flex items-center text-sm">
                    <input 
                      type="radio" 
                      name="format" 
                      value="PDF" 
                      checked={formData.format === 'PDF'} 
                      onChange={() => setFormData({...formData, format: 'PDF'})}
                      className="mr-2"
                    /> PDF
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full flex justify-center items-center"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Generating...
                  </>
                ) : (
                  <>
                    <FaFilter className="mr-2" /> Generate Report
                  </>
                )}
              </Button>
            </form>
          </Card>

          {reportGenerated && (
            <Card className="mt-6 bg-green-50 border border-green-200">
              <div className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-bold text-green-900">Report Ready</h4>
                  <p className="text-xs text-green-700 mb-4">Your report has been successfully generated and is ready for download.</p>
                  <a 
                    href="/data/sample_report.csv" 
                    download 
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 text-sm font-medium"
                  >
                    <FaFileDownload className="mr-2" /> Download report_{new Date().toISOString().split('T')[0]}.csv
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2">
          <Card title="Sample Data Preview">
            <div className="mb-4 text-xs text-gray-500 italic">
              Showing first 3 rows of filtered data.
            </div>
            <Table
              headers={['Student Name', 'Company', 'Role', 'Status', 'Date']}
              data={sampleData}
              renderRow={(row) => (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                </>
              )}
            />
            {reportGenerated && (
               <div className="mt-6 flex justify-center">
                 <Button variant="secondary" size="sm">
                   View Full Preview (156 rows)
                 </Button>
               </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
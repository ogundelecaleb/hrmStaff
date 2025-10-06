import React from "react";
import { DocumentText } from "iconsax-react";
import AppointmentConfirmation from "./AppointmentConfirmation";
import AppointmentRegularization from "./AppointmentRegularization";
import AppointmentWithdrawal from "./AppointmentWithdrawal";
import AssumptionOfDuty from "./AssumptionOfDuty";

const AllApplications = () => {
  const [activeTab, setActiveTab] = React.useState("confirmation");

  const tabs = [
    { id: "confirmation", label: "Appointment Confirmation", component: AppointmentConfirmation },
    { id: "regularization", label: "Appointment Regularization", component: AppointmentRegularization },
    { id: "withdrawal", label: "Appointment Withdrawal", component: AppointmentWithdrawal },
    { id: "assumption", label: "Assumption of Duty", component: AssumptionOfDuty },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AppointmentConfirmation;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DocumentText className="text-purple-600" size={24} />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                All Applications
              </h1>
              <p className="text-gray-600">
                Manage your appointment applications
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 md:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default AllApplications;
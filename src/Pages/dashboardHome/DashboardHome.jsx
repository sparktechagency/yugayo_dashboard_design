import PatientStatusDistribution from "../../components/dashboardHome/PatientStatusDistribution";
import PendingActions from "../../components/dashboardHome/PendingActions";
import QuickActions from "../../components/dashboardHome/QuickActions";
import RecentActivity from "../../components/dashboardHome/RecentActivity";
import StatsCards from "../../components/dashboardHome/StatsCards";


const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins pb-20">
     

      {/* Stats Row */}
      <StatsCards />

      {/* Middle Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Status + Quick Actions */}
        <div className="col-span-2">
          <PatientStatusDistribution />
          <QuickActions />
        </div>

        {/* Right: Pending Actions */}
        <div className="col-span-1">
          <PendingActions />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default DashboardHome;
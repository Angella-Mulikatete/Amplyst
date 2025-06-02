import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  DollarSign, 
  Calendar,
  Camera,
  Star,
  Bell,
  Settings,
  Plus
} from "lucide-react";

const InfluencerDashboard = () => {
  const stats = [
    {
      title: "Total Followers",
      value: "125.4K",
      icon: Users,
      change: "+12.5%",
      color: "text-primary"
    },
    {
      title: "Engagement Rate",
      value: "4.8%",
      icon: Heart,
      change: "+0.3%",
      color: "text-secondary"
    },
    {
      title: "Monthly Views",
      value: "2.1M",
      icon: Eye,
      change: "+8.7%",
      color: "text-accent"
    },
    {
      title: "Earnings (MTD)",
      value: "$3,250",
      icon: DollarSign,
      change: "+15.2%",
      color: "text-green-600"
    }
  ];

  const activeCampaigns = [
    {
      id: 1,
      brand: "EcoStyle",
      title: "Sustainable Fashion Week",
      status: "In Progress",
      deadline: "2024-06-15",
      payment: "$850",
      completion: 65
    },
    {
      id: 2,
      brand: "TechFlow",
      title: "Smart Home Review",
      status: "Pending",
      deadline: "2024-06-20",
      payment: "$1,200",
      completion: 25
    },
    {
      id: 3,
      brand: "FitLife",
      title: "Wellness Challenge",
      status: "Review",
      deadline: "2024-06-10",
      payment: "$650",
      completion: 90
    }
  ];

  const recentActivity = [
    {
      type: "campaign",
      message: "New campaign invitation from EcoStyle",
      time: "2 hours ago",
      icon: Calendar
    },
    {
      type: "payment",
      message: "Payment received: $850 from TechFlow",
      time: "1 day ago",
      icon: DollarSign
    },
    {
      type: "content",
      message: "Content approved for FitLife campaign",
      time: "2 days ago",
      icon: Camera
    },
    {
      type: "milestone",
      message: "Reached 125K followers milestone!",
      time: "3 days ago",
      icon: Star
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Review":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 font-poppins">Amplyst</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
            Welcome back, Jessica! 👋
          </h1>
          <p className="text-gray-600 font-sofia">
            Here's what's happening with your influencer journey today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-sofia">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.color} font-sofia`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-poppins">Active Campaigns</CardTitle>
                <Button size="sm" className="bg-primary hover:bg-primary-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Campaigns
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 font-poppins">
                            {campaign.title}
                          </h4>
                          <p className="text-sm text-gray-600 font-sofia">
                            {campaign.brand}
                          </p>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 font-sofia">Progress</span>
                          <span className="font-medium">{campaign.completion}%</span>
                        </div>
                        <Progress value={campaign.completion} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 font-sofia">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            Due: {new Date(campaign.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-semibold text-green-600">
                          {campaign.payment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-poppins">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-sofia">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6 animate-fade-in">
              <CardHeader>
                <CardTitle className="font-poppins">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-primary hover:bg-primary-600">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Content
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
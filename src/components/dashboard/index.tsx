import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart2, Calendar, Settings } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Buletin.co</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your writer dashboard.
            </p>
          </div>
          <Button onClick={() => alert("New article feature coming soon!")}>
            <FileText className="mr-2 h-4 w-4" /> New Article
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Articles Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Articles
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't published any articles yet. Start writing your
                    first piece.
                  </p>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" /> Create Your First
                    Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No analytics data
                  </h3>
                  <p className="text-muted-foreground">
                    Analytics will appear once you've published content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Your publishing calendar
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Plan and schedule your content for consistent publishing.
                  </p>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage your writer profile and preferences.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage how you receive notifications
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div>
                      <h4 className="font-medium">Account Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your account information
                      </p>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

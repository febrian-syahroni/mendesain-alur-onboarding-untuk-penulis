import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfileSetupForm from "./ProfileSetupForm";
import TutorialContent from "./TutorialContent";
import { CheckCircle } from "lucide-react";

export type OnboardingStep = "profile" | "tutorial" | "preview" | "checklist";

interface OnboardingStepContentProps {
  currentStep: OnboardingStep;
  onNextStep: () => void;
  onPrevStep: () => void;
  onComplete: () => void;
}

const OnboardingStepContent = ({
  currentStep = "profile",
  onNextStep = () => {},
  onPrevStep = () => {},
  onComplete = () => {},
}: OnboardingStepContentProps) => {
  const [profileData, setProfileData] = useState({});
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  const handleProfileSubmit = (data: any) => {
    setProfileData(data);
    onNextStep();
  };

  const handleTutorialComplete = () => {
    setTutorialCompleted(true);
    onNextStep();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "profile":
        return <ProfileSetupForm onSubmit={handleProfileSubmit} />;
      case "tutorial":
        return <TutorialContent onComplete={handleTutorialComplete} />;
      case "preview":
        return <DashboardPreview onNext={onNextStep} />;
      case "checklist":
        return <WelcomeChecklist onComplete={onComplete} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto bg-background"
    >
      <Card className="border shadow-lg">
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        {currentStep !== "profile" && (
          <Button variant="outline" onClick={onPrevStep}>
            Back
          </Button>
        )}
        {currentStep === "profile" && (
          <div></div> // Empty div for spacing when no back button
        )}
      </div>
    </motion.div>
  );
};

// Dashboard Preview Component
const DashboardPreview = ({ onNext = () => {} }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Preview Your Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Here's what your writer dashboard will look like once you're onboarded
        </p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Analytics Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-md text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">
                Articles Published
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-md text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-md text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Subscribers</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Content Calendar</h3>
          <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">
              Your publishing schedule will appear here
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Editorial Tools</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-md flex items-center">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary">✏️</span>
              </div>
              <div>
                <p className="font-medium">Article Editor</p>
                <p className="text-xs text-muted-foreground">
                  Create and edit your content
                </p>
              </div>
            </div>
            <div className="bg-muted/30 p-4 rounded-md flex items-center">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary">📊</span>
              </div>
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-xs text-muted-foreground">
                  Track your performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={onNext}>Continue to Final Step</Button>
      </div>
    </div>
  );
};

// Welcome Checklist Component
const WelcomeChecklist = ({ onComplete = () => {} }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Write your first article",
      description: "Start with a topic you're passionate about",
      completed: false,
    },
    {
      id: 2,
      title: "Introduce yourself to the community",
      description: "Post a brief introduction in the writers forum",
      completed: false,
    },
    {
      id: 3,
      title: "Set up your publishing calendar",
      description: "Plan your content schedule for the next month",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const allTasksCompleted = tasks.every((task) => task.completed);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to Buletin.co!</h2>
        <p className="text-muted-foreground mt-2">
          Complete these tasks to get started on your writing journey
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${task.completed ? "bg-primary/5 border-primary/20" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${task.completed ? "bg-primary border-primary text-white" : "border-muted-foreground"}`}
              >
                {task.completed && <CheckCircle className="w-4 h-4" />}
              </div>
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={onComplete} disabled={!allTasksCompleted}>
          {allTasksCompleted
            ? "Complete Onboarding"
            : "Complete All Tasks to Continue"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStepContent;

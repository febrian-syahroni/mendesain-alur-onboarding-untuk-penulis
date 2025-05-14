import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
// Create the OnboardingStepContent component inline since there seems to be an issue with importing it
// This is a temporary solution until the actual component is properly implemented

const steps = [
  { id: 1, name: "Profile Setup" },
  { id: 2, name: "Tutorial" },
  { id: 3, name: "Platform Preview" },
  { id: 4, name: "Welcome Checklist" },
];

// Inline implementation of OnboardingStepContent
const OnboardingStepContent = ({ step = 1, onComplete = () => {} }) => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Profile Setup</h2>
          <p className="text-gray-600">
            Tell us about yourself and your writing experience. This information
            will help us tailor your experience and connect you with the right
            audience.
          </p>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Areas of Expertise</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Technology",
                  "Business",
                  "Health",
                  "Culture",
                  "Politics",
                  "Science",
                ].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={area}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={area} className="text-sm">
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Tutorial</h2>
          <p className="text-gray-600">
            Learn about our content guidelines and editorial process to ensure
            your articles meet our standards.
          </p>
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Content Guidelines</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Focus on providing value to readers</li>
              <li>Use clear, concise language</li>
              <li>Back claims with credible sources</li>
              <li>Avoid clickbait and sensationalism</li>
              <li>Respect copyright and intellectual property</li>
            </ul>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Platform Preview</h2>
          <p className="text-gray-600">
            Get a glimpse of the tools and features available to you as a
            Buletin.co writer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Analytics Dashboard</h3>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Analytics Preview</span>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Content Editor</h3>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Editor Preview</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Welcome Checklist</h2>
          <p className="text-gray-600">
            Here are some tasks to help you get started on your writing journey
            with us.
          </p>
          <div className="space-y-3">
            {[
              "Complete your profile with a professional photo",
              "Brainstorm ideas for your first article",
              "Explore recent popular content in your niche",
              "Connect with other writers in the community",
              "Schedule your first content submission",
            ].map((task, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded border border-gray-300 mt-0.5"></div>
                <span>{task}</span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return <div>Unknown step</div>;
  }
};

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const progressPercentage = (currentStep - 1) * (100 / (steps.length - 1));

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Here you would typically redirect to the writer dashboard
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to Buletin.co
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            Let's get you set up as a writer on our platform
          </p>
        </div>

        {!completed ? (
          <>
            <div className="px-6 pt-6">
              <div className="flex justify-between mb-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${currentStep >= step.id ? "text-primary" : "text-gray-400"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      {step.id}
                    </div>
                    <span className="text-xs md:text-sm hidden md:block">
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
              <Progress value={progressPercentage} className="h-2 mb-6" />
            </div>

            <CardContent className="p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OnboardingStepContent
                  step={currentStep}
                  onComplete={handleNext}
                />
              </motion.div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>Continue</Button>
                ) : (
                  <Button onClick={handleComplete}>Complete Onboarding</Button>
                )}
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Onboarding Complete!</h2>
              <p className="text-gray-600 mb-6">
                You're all set to start writing amazing content for Buletin.co
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="px-8"
            >
              Go to Writer Dashboard
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Home;

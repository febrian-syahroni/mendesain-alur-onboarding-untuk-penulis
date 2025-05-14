import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, BookOpen, FileText, MessageSquare } from "lucide-react";

interface TutorialContentProps {
  onComplete?: () => void;
  onBack?: () => void;
}

const TutorialContent = ({
  onComplete = () => {},
  onBack = () => {},
}: TutorialContentProps) => {
  const [activeTab, setActiveTab] = useState("guidelines");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const tabs = [
    {
      id: "guidelines",
      label: "Content Guidelines",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "editorial",
      label: "Editorial Process",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "quiz",
      label: "Comprehension Check",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  const quizQuestions = [
    {
      id: "q1",
      question: "What is the minimum word count for a standard article?",
      options: [
        { value: "a", label: "300 words" },
        { value: "b", label: "500 words" },
        { value: "c", label: "800 words" },
        { value: "d", label: "1000 words" },
      ],
      correctAnswer: "c",
    },
    {
      id: "q2",
      question:
        "How many rounds of editorial review does each article go through?",
      options: [
        { value: "a", label: "1 round" },
        { value: "b", label: "2 rounds" },
        { value: "c", label: "3 rounds" },
        { value: "d", label: "It depends on the article quality" },
      ],
      correctAnswer: "b",
    },
    {
      id: "q3",
      question: "What is NOT allowed in Buletin.co content?",
      options: [
        { value: "a", label: "Personal opinions" },
        { value: "b", label: "Statistical data" },
        { value: "c", label: "Unverified claims" },
        { value: "d", label: "Expert quotes" },
      ],
      correctAnswer: "c",
    },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "guidelines") setProgress(33);
    if (value === "editorial") setProgress(66);
    if (value === "quiz") setProgress(100);
  };

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    return (correctCount / quizQuestions.length) * 100;
  };

  const allQuestionsAnswered = quizQuestions.every((q) => quizAnswers[q.id]);
  const quizScore = calculateScore();
  const quizPassed = quizScore >= 70;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Interactive Tutorial
        </CardTitle>
        <CardDescription className="text-center">
          Learn about our content guidelines and editorial process
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="guidelines" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Content Quality Standards
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    At Buletin.co, we maintain high standards for all published
                    content. Your articles should be:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Well-researched with credible sources</li>
                    <li>Minimum 800 words for standard articles</li>
                    <li>Free from grammatical and spelling errors</li>
                    <li>Original and not published elsewhere</li>
                    <li>Structured with clear headings and subheadings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    Content Restrictions
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    The following content is not permitted on our platform:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Unverified claims or misinformation</li>
                    <li>Plagiarized content</li>
                    <li>Hate speech or discriminatory language</li>
                    <li>Excessive self-promotion or advertising</li>
                    <li>Content that violates copyright laws</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => handleTabChange("editorial")}>
                  Continue to Editorial Process
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="editorial" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Editorial Workflow</h3>
                  <p className="text-muted-foreground mt-2">
                    Each article goes through a structured editorial process:
                  </p>
                  <ol className="list-decimal pl-6 mt-2 space-y-3">
                    <li>
                      <span className="font-medium">Submission</span>
                      <p className="text-sm text-muted-foreground">
                        Submit your draft through the writer dashboard
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Initial Review</span>
                      <p className="text-sm text-muted-foreground">
                        Our editors check for compliance with guidelines
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Editorial Feedback</span>
                      <p className="text-sm text-muted-foreground">
                        Receive suggestions for improvement
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Final Review</span>
                      <p className="text-sm text-muted-foreground">
                        After revisions, your article undergoes a final check
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Publication</span>
                      <p className="text-sm text-muted-foreground">
                        Approved articles are scheduled for publication
                      </p>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Review Timeline</h3>
                  <p className="text-muted-foreground mt-2">
                    Our editorial team aims to review submissions within these
                    timeframes:
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="font-medium w-32">Initial Review:</span>
                      <span>1-2 business days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-medium w-32">
                        Editorial Feedback:
                      </span>
                      <span>2-3 business days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-medium w-32">Final Review:</span>
                      <span>1 business day</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleTabChange("guidelines")}
                >
                  Back to Guidelines
                </Button>
                <Button onClick={() => handleTabChange("quiz")}>
                  Continue to Quiz
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {!quizStarted && !quizSubmitted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Comprehension Check
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Let's make sure you understand our content guidelines and
                    editorial process. This quick quiz will test your knowledge
                    of the key points covered in the tutorial.
                  </p>
                  <Button onClick={() => setQuizStarted(true)}>
                    Start Quiz
                  </Button>
                </div>
              ) : quizSubmitted ? (
                <div className="text-center py-8">
                  <div className="mb-6">
                    {quizPassed ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold text-green-600">
                          Congratulations!
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          You scored {quizScore}% and have successfully
                          completed the tutorial.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-amber-600">
                          Almost there!
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          You scored {quizScore}%. You need 70% to pass. Please
                          review the material and try again.
                        </p>
                      </div>
                    )}
                  </div>
                  {quizPassed ? (
                    <Button onClick={onComplete}>Continue to Next Step</Button>
                  ) : (
                    <div className="flex gap-4 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuizSubmitted(false);
                          handleTabChange("guidelines");
                        }}
                      >
                        Review Material
                      </Button>
                      <Button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                      >
                        Retry Quiz
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <h3 className="text-lg font-semibold">Comprehension Quiz</h3>
                  <p className="text-muted-foreground">
                    Please answer all questions to complete the tutorial.
                  </p>

                  {quizQuestions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">
                        Question {index + 1}: {q.question}
                      </h4>
                      <RadioGroup
                        value={quizAnswers[q.id] || ""}
                        onValueChange={(value) => handleQuizAnswer(q.id, value)}
                      >
                        <div className="space-y-2">
                          {q.options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={`${q.id}-${option.value}`}
                              />
                              <Label htmlFor={`${q.id}-${option.value}`}>
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => handleTabChange("editorial")}
                    >
                      Back to Editorial
                    </Button>
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={!allQuestionsAnswered}
                    >
                      Submit Answers
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="text-sm text-muted-foreground">
          Step 2 of 4: Tutorial
        </div>
      </CardFooter>
    </Card>
  );
};

export default TutorialContent;

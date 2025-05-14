import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Upload, X, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const expertiseAreas = [
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "health", label: "Health & Wellness" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "entertainment", label: "Entertainment" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "science", label: "Science" },
  { id: "politics", label: "Politics" },
  { id: "sports", label: "Sports" },
];

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z
    .string()
    .min(50, { message: "Bio should be at least 50 characters." })
    .max(500, { message: "Bio should not exceed 500 characters." }),
  expertise: z
    .array(z.string())
    .min(1, { message: "Please select at least one area of expertise." }),
  writingSamples: z
    .array(z.any())
    .min(1, { message: "Please upload at least one writing sample." }),
  socialLinks: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileSetupFormProps {
  onSubmit?: (data: FormValues) => void;
  onBack?: () => void;
}

const ProfileSetupForm: React.FC<ProfileSetupFormProps> = ({
  onSubmit = () => {},
  onBack = () => {},
}) => {
  const [step, setStep] = useState<number>(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      bio: "",
      expertise: [],
      writingSamples: [],
      socialLinks: {
        twitter: "",
        linkedin: "",
        website: "",
      },
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      form.setValue("writingSamples", [...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    form.setValue("writingSamples", updatedFiles);
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await form.trigger(["fullName", "email", "bio"]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await form.trigger(["expertise"]);
      if (isValid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Writer Profile Setup
        </CardTitle>
        <CardDescription className="text-center">
          Tell us about yourself and your writing experience
        </CardDescription>
        <div className="flex justify-center mt-4">
          <div className="flex items-center">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {step > i ? <Check size={16} /> : i}
                </div>
                {i < 3 && (
                  <div
                    className={`h-1 w-10 ${step > i ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writer Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your background, experience, and writing style..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="expertise"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Areas of Expertise</FormLabel>
                        <FormDescription>
                          Select all areas that you have experience writing
                          about
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {expertiseAreas.map((area) => (
                          <FormField
                            key={area.id}
                            control={form.control}
                            name="expertise"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={area.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(area.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              area.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== area.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {area.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter/X Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialLinks.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Website (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="writingSamples"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writing Samples</FormLabel>
                      <FormDescription>
                        Upload samples of your previous writing work (PDF, DOC,
                        or DOCX)
                      </FormDescription>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            multiple
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-600">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              PDF, DOC, or DOCX (Max 10MB each)
                            </span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />

                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">Uploaded Files:</p>
                          <ul className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                              >
                                <span className="text-sm truncate max-w-[80%]">
                                  {file.name}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Profile Review</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please review your information before submitting. You can go
                    back to make changes if needed.
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm ml-2">
                        {form.getValues("fullName")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm ml-2">
                        {form.getValues("email")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        Areas of Expertise:
                      </span>
                      <span className="text-sm ml-2">
                        {form
                          .getValues("expertise")
                          .map(
                            (id) =>
                              expertiseAreas.find((area) => area.id === id)
                                ?.label,
                          )
                          .join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        Writing Samples:
                      </span>
                      <span className="text-sm ml-2">
                        {uploadedFiles.length} file(s) uploaded
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          {step === 1 ? "Back" : "Previous"}
        </Button>

        {step < 3 ? (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit}>
            Submit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileSetupForm;

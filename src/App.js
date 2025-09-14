import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveAs } from "file-saver";
import "./index.css";

/* Validation schema */
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\-.\s]{5,15}$/,
      "Enter a valid phone number"
    ),
  nationality: yup.string().required("Please select nationality"),
  linkedinOptIn: yup.boolean(),
  linkedin: yup
  .string()
  .when("linkedinOptIn", (linkedinOptIn, schema) =>
    linkedinOptIn
      ? schema
          .required("LinkedIn URL is required")
          .url("Must be a valid URL")
          .matches(/linkedin\.com/, "Must be a LinkedIn URL")
      : schema.notRequired()
  ),

  preferredLanguage: yup.string().required("Preferred language required"),
  cv: yup
    .mixed()
    .test("fileRequired", "CV is required", (value) => value && value.length > 0)
    .test(
      "fileSize",
      "File too large (max 5MB)",
      (value) => !value || (value[0] && value[0].size <= 5 * 1024 * 1024)
    ),
});

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      nationality: "",
      linkedinOptIn: false,
      linkedin: "",
      preferredLanguage: "English",
      cv: null,
    },
  });

  const [serverMessage, setServerMessage] = useState(null);

  // Autosave to localStorage (only fields, excluding file)
const watchedFields = watch([
  "fullName",
  "address",
  "phone",
  "nationality",
  "linkedinOptIn",
  "linkedin",
  "preferredLanguage",
]);

useEffect(() => {
  // Save to localStorage
  try {
    const toSave = { ...watchedFields };
    localStorage.setItem("hpair_form_autosave_v1", JSON.stringify(toSave));
  } catch (err) {
    console.error("Failed to autosave form:", err);
  }
}, [watchedFields]);



  // Load saved data on mount
useEffect(() => {
  try {
    const saved = localStorage.getItem("hpair_form_autosave_v1");
    if (saved) reset(JSON.parse(saved));
  } catch (err) {
    console.error("Failed to load autosave:", err);
  }
}, [reset]);


  const onSubmit = async (data) => {
    setServerMessage({ type: "loading", text: "Submitting..." });

    // Simulate server delay
    await new Promise((r) => setTimeout(r, 1000));

    const cvFile = data.cv && data.cv[0];
    const summary = {
      fullName: data.fullName,
      address: data.address,
      phone: data.phone,
      nationality: data.nationality,
      linkedin: data.linkedinOptIn ? data.linkedin : null,
      preferredLanguage: data.preferredLanguage,
      submittedAt: new Date().toISOString(),
      cvName: cvFile ? cvFile.name : null,
      cvSizeBytes: cvFile ? cvFile.size : null,
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: "application/json" });
    saveAs(blob, `${data.fullName.replace(/\s+/g, "_")}_submission.json`);

    setServerMessage({ type: "success", text: "Submission successful!" });
  };

  const linkedinOptIn = watch("linkedinOptIn");

  return (
    <div className="container">
      <h1>Personal Information Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Full name
          <input {...register("fullName")} placeholder="Jane Doe" />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </label>

        <label>
          Address
          <textarea {...register("address")} placeholder="123 Main St" rows={3} />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </label>

        <label>
          Phone number
          <input {...register("phone")} placeholder="+1 555 555 5555" />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </label>

        <label>
          Nationality
          <select {...register("nationality")}>
            <option value="">Select nationality</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Other">Other</option>
          </select>
          {errors.nationality && <p className="error">{errors.nationality.message}</p>}
        </label>

        <label className="inline">
          <input type="checkbox" {...register("linkedinOptIn")} />
          I have a LinkedIn URL
        </label>

        {linkedinOptIn && (
          <label>
            LinkedIn URL
            <input {...register("linkedin")} placeholder="https://www.linkedin.com/in/..." />
            {errors.linkedin && <p className="error">{errors.linkedin.message}</p>}
          </label>
        )}

        <label>
          Preferred language
          <select {...register("preferredLanguage")}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Mandarin">Mandarin</option>
            <option value="French">French</option>
            <option value="Other">Other</option>
          </select>
          {errors.preferredLanguage && <p className="error">{errors.preferredLanguage.message}</p>}
        </label>

        <label>
          CV (PDF or DOCX, max 5MB)
          <input type="file" {...register("cv")} accept=".pdf,.doc,.docx" />
          {errors.cv && <p className="error">{errors.cv.message}</p>}
          {watch("cv") && watch("cv").length > 0 && (
            <div className="filePreview">
              Selected file: {watch("cv")[0].name} ({Math.round(watch("cv")[0].size / 1024)} KB)
            </div>
          )}
        </label>

        <div className="actions">
          <button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => {
              const saved = localStorage.getItem("hpair_form_autosave_v1");
              if (saved) {
                navigator.clipboard?.writeText(saved);
                alert("JSON autosave copied to clipboard.");
              } else {
                alert("No autosaved progress found.");
              }
            }}
          >
            Copy autosave JSON
          </button>
        </div>

        {serverMessage && (
          <div className={`serverMessage ${serverMessage.type}`}>{serverMessage.text}</div>
        )}

        {isSubmitSuccessful && <div className="successBanner">Thanks — submission completed.</div>}
      </form>
    </div>
  );
}

import SubmissionStatusPage from "@/components/submission-status/SubmissionStatusPage";

export const metadata = {
  title: "Thank You — Rio Children's Hospital",
  description: "Your request has been received by the Rio care team.",
};

export default function ThankYouPage() {
  return (
    <SubmissionStatusPage
      type="success"
      title="Thank you for reaching out."
      description="Your request is with our care team. We will call you shortly."
    />
  );
}

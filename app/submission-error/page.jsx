import SubmissionStatusPage from "@/components/submission-status/SubmissionStatusPage";

export const metadata = {
  title: "Submission Error — Rio Children's Hospital",
  description: "We could not submit your request. Please try again or contact Rio directly.",
};

export default function SubmissionErrorPage({ searchParams }) {
  const retryHref = searchParams?.source === "contact" ? "/contact#enquire" : "/book-appointment";

  return (
    <SubmissionStatusPage
      type="error"
      title="We couldn't send your request."
      description="Please try again, or call our care team if you need help."
      retryHref={retryHref}
    />
  );
}

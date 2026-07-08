export default function TopStrip({ callHref = "tel:+917708318222", callLabel = "+91 77083 18222" }) {
  return (
    <div className="topstrip">
      24/7 Emergency • NICU • PICU — <a href={callHref}>Call now: {callLabel}</a>
    </div>
  );
}

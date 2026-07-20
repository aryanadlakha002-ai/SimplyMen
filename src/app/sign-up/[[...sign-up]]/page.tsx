import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-surface to-white">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "rounded-2xl shadow-xl border border-border/50",
            headerTitle: "font-display text-primary-dark",
            headerSubtitle: "text-muted",
            formButtonPrimary:
              "bg-primary hover:bg-primary-dark rounded-xl text-sm font-semibold",
            formFieldInput:
              "rounded-xl border-border focus:ring-primary/30",
            footerActionLink: "text-primary hover:text-primary-dark",
          },
        }}
      />
    </div>
  );
}

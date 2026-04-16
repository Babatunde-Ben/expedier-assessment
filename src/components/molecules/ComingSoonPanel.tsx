interface ComingSoonPanelProps {
  label: string;
  description?: string;
}

export function ComingSoonPanel({
  label,
  description = "This section is coming soon.",
}: ComingSoonPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <p className="font-medium text-foreground capitalize">{label}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

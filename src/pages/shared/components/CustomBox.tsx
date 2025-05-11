export default function CustomBox({ title, description, children }: any) {
  return (
    <div className="bg-white dark:bg-black border border-main-border text-3xl">
      <h2 className="text-lg font-semibold text-theme-primary">{title}</h2>
      {description && <p className="text-sm opacity-80 mb-2">{description}</p>}
      <div className="text-sm">{children}</div>
    </div>
  );
}

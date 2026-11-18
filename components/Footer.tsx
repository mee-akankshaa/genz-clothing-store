export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-current bg-ink px-4 py-10 text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:justify-between">
        <p className="font-display text-2xl uppercase">Drip Lab</p>
        <p className="max-w-md opacity-80">
          Demo storefront. Drip Lab is a fictional label and checkout is a mock. No payments are taken and no data leaves your browser.
        </p>
      </div>
    </footer>
  );
}

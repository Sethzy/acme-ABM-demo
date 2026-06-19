function Wordmark() {
  return (
    <div className="inline-flex min-h-[44px] items-center text-[31px] font-semibold leading-none tracking-normal text-[var(--color-ink-blue)]">
      acme
    </div>
  );
}

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-[86px] items-center bg-transparent">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-5 sm:px-8 lg:px-10 xl:px-0">
        <Wordmark />
      </div>
    </header>
  );
}

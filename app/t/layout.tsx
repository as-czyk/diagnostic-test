import { Sidebar } from "@/components/custom/Sidebar";
import UserProfileHeader from "@/components/custom/user-profile-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={
        "grid grid-cols-[10%_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-[65px_1fr_1fr_1fr_1fr_1fr_1fr] h-screen gap-x-4"
      }
    >
      <header className={"col-start-2 col-end-8 row-start-1 row-end-1"}>
        <div className="absolute top-4 right-4">
          <UserProfileHeader />
        </div>
      </header>
      <nav
        className={
          "border-r bg-background col-start-1 col-end-1 row-start-1 row-end-8 sidebar group w-12 overflow-hidden transition-all duration-300 ease-linear text-whiteColor hover:w-48 hover:z-10"
        }
      >
        <Sidebar />
      </nav>
      <main className="col-start-2 col-end-8 row-start-2 row-end-8 mt-8">
        {children}
      </main>
    </main>
  );
}

import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen min-h-screen">สวัสดี</main>
    </SidebarProvider>
  );
}

export default App;

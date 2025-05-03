import { AppSidebar } from "./components/app-sidebar";
import Container from "./components/container";
import Content from "./components/content";
import Header from "./components/header";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-screen min-h-screen bg-gray-100">
        <Container>
          <SidebarTrigger className="flex justify-center items-center absolute top-3 right-3 text-primary md:hidden " />
          <Header />
          <Content />
        </Container>
      </main>
    </SidebarProvider>
  );
}

export default App;

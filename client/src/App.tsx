import { AppSidebar } from "./components/app-sidebar";
import Container from "./components/container";
import Content from "./components/content";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

import { FormDialog } from "./components/form-dailog";

function App() {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main section */}
      <main className="relative w-screen min-h-screen bg-gray-100">
        <Container className="relative mt-5 md:mt-24 mx-5 mb-5 h-[800px]">
          <SidebarTrigger className="flex md:hidden justify-center items-center absolute top-3 right-3 text-primary" />

          {/* Content component */}
          <Content />
        </Container>

        {/* Form dialog component */}
        <FormDialog />
      </main>
    </SidebarProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppSidebar } from "./components/app-sidebar";
import Container from "./components/container";
import Content from "./components/content";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { FormDialog } from "./components/form-dailog";
import { ToastContainer, Bounce } from "react-toastify";

// Create QueryClient client for use react query in app
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

          {/* Toast notification container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;

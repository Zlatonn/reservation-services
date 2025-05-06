import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginationStore } from "../stores/use-pagination-store";

const BASE_URL = "http://localhost:3000";

// Set default config
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Offices api
interface Office {
  name: string;
  address?: string;
}

export const useCreateOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createOffice"],
    mutationFn: async (newOffice: Office) => {
      const response = await axiosClient.post(`/offices`, newOffice);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
    onError: (error) => {
      console.log("Error create ofiice: ", error);
    },
  });
};

export const useGetOffices = () => {
  return useQuery({
    queryKey: ["offices"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/offices`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching offices: ", error);
      }
    },
  });
};

export const useGetOffice = (id: string) => {
  return useQuery({
    queryKey: ["office", id],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/offices/${id}`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching office: ", error);
      }
    },
    enabled: !!id,
  });
};

export const useUpdateOffice = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateOffice", id],
    mutationFn: async (updateOffice: Office) => {
      const response = await axiosClient.patch(`/offices/${id}`, updateOffice);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
    onError: (error) => {
      console.log("Error update ofiice: ", error);
    },
  });
};

export const useDeleteOffice = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteOffice", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/offices/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
    onError: (error) => {
      console.log("Error delete ofiice: ", error);
    },
  });
};

export const useGetAllServiceByOfficeId = (officeId: string) => {
  // Import from usePaginationStore
  const { skip, take, setTotalCount } = usePaginationStore();
  return useQuery({
    queryKey: ["serviceByofficeId", officeId, skip, take],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/offices/${officeId}/services`, { params: { skip, take } });
        // Set total count of service
        setTotalCount(response.data.totalCount);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching service by office ID: ", error);
      }
    },
    enabled: !!officeId,
  });
};

interface OpenningDay {
  day: number;
}

interface Service {
  category: string;
  name: string;
  reservableDate: Date | undefined;
  openingDays: OpenningDay[];
  description?: string;
}
// Service api
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createService"],
    mutationFn: async (newService: Service) => {
      const response = await axiosClient.post(`/services`, newService);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch serviceByofficeId query
      queryClient.invalidateQueries({ queryKey: ["serviceByofficeId"] });
    },
    onError: (error) => {
      console.log("Error create service: ", error);
    },
  });
};

export const useGetService = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/services/${id}`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching service: ", error);
      }
    },
    enabled: !!id,
  });
};

export const useUpdateService = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateService", id],
    mutationFn: async (updateService: Service) => {
      const response = await axiosClient.put(`/services/${id}`, updateService);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch serviceByofficeId query
      queryClient.invalidateQueries({ queryKey: ["serviceByofficeId"] });
    },
    onError: (error) => {
      console.log("Error update service: ", error);
    },
  });
};

export const useDeleteService = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteService", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/services/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch serviceByofficeId query
      queryClient.invalidateQueries({ queryKey: ["serviceByofficeId"] });
    },
    onError: (error) => {
      console.log("Error delete service: ", error);
    },
  });
};

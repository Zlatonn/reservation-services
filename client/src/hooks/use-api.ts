import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { usePaginationStore } from "../stores/use-pagination-store";
import { useSearchStore } from "@/stores/use-search-store";

import { OfficeApi, ServiceApi, ServiceCateogryApi, ServiceNameApi } from "@/types/types";

const BASE_URL = "http://localhost:3000";

// Set default config
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Offices api

export const useCreateOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createOffice"],
    mutationFn: async (newOffice: OfficeApi) => {
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
    mutationFn: async (updateOffice: OfficeApi) => {
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

  // Import useSearchStore
  const { search } = useSearchStore();

  // Debounce search using useDebounce
  const [debouncedSearch] = useDebounce(search, 500);

  return useQuery({
    queryKey: ["serviceByofficeId", officeId, skip, take, debouncedSearch],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/offices/${officeId}/services`, { params: { skip, take, search: debouncedSearch } });
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

// Service api
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createService"],
    mutationFn: async (newService: ServiceApi) => {
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
    mutationFn: async (updateService: ServiceApi) => {
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

// Category api
export const useCreateServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createServiceCategory"],
    mutationFn: async (newServiceCategory: ServiceCateogryApi) => {
      const response = await axiosClient.post(`/service-categories`, newServiceCategory);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceCategories"] });
    },
    onError: (error) => {
      console.log("Error create service category: ", error);
    },
  });
};

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: ["serviceCategories"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/service-categories`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching service categories: ", error);
      }
    },
  });
};

export const useUpdateServiceCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateServiceCategory", id],
    mutationFn: async (updateServiceCategory: ServiceCateogryApi) => {
      const response = await axiosClient.patch(`/service-categories/${id}`, updateServiceCategory);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceCategories"] });
    },
    onError: (error) => {
      console.log("Error update service category: ", error);
    },
  });
};

export const useDeleteServiceCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteServiceCategory", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/service-categories/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceCategories"] });
    },
    onError: (error) => {
      console.log("Error delete service category: ", error);
    },
  });
};

export const useGetAllServiceNamesByServiceCategoryId = (serviceCategoryId: string) => {
  return useQuery({
    queryKey: ["serviceNameByServiceCategoryId", serviceCategoryId],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/service-categories/${serviceCategoryId}/service-names`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching service by office ID: ", error);
      }
    },
    enabled: !!serviceCategoryId,
  });
};

// Name api
export const useCreateServiceName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createServiceName"],
    mutationFn: async (newServiceName: ServiceNameApi) => {
      const response = await axiosClient.post(`/service-names`, newServiceName);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceNames"] });
    },
    onError: (error) => {
      console.log("Error create service name: ", error);
    },
  });
};

export const useGetServiceNames = () => {
  return useQuery({
    queryKey: ["serviceNames"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/service-names`);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching service names: ", error);
      }
    },
  });
};

export const useUpdateServiceName = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateServiceName", id],
    mutationFn: async (updateServiceName: ServiceNameApi) => {
      const response = await axiosClient.patch(`/service-names/${id}`, updateServiceName);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceNames"] });
    },
    onError: (error) => {
      console.log("Error update service name: ", error);
    },
  });
};

export const useDeleteServiceName = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteServiceName", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/service-names/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and force refetch offices query
      queryClient.invalidateQueries({ queryKey: ["serviceNames"] });
    },
    onError: (error) => {
      console.log("Error delete service name: ", error);
    },
  });
};

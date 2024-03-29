import { useQuery } from "@tanstack/react-query";
import api from '../api';

export function useRoles() {
  return useQuery('roles', api.fetchRole);
}

export function useFaculties() {
  return useQuery('faculties', api.fetchFaculties);
}

export function useDepartments() {
  return useQuery('departments', api.fethDeparments);
}

export function useUsers() {
  return useQuery('users', api.fetchUsers, {
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });
}
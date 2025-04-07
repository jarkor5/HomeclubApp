import { useEffect, useState, useCallback } from 'react';

export interface Reservation {
  name: string;
  url: string;
  status: 'reserved' | 'free';
}

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Limpiar errores anteriores

      const response = await fetch('https://run.mocky.io/v3/de7114a5-e125-45f1-800a-b926e4ee265a');

      if (!response.ok) throw new Error('Error al obtener las reservas');

      const data: Reservation[] = await response.json();
      setReservations(data);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservations,
    loading,
    error,
    refetch: fetchReservations,
  };
}

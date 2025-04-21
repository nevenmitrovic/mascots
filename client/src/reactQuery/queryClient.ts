import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      //   refetchInterval, broj sekundi za koliko automatski hoces da se radi refetch
      //   refetchOnMount, ova i sledece tri su boolean, default su true
      //   refetchOnWindowFocus,
      //   refetchOnReconnect
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
});

//staleTime: je vreme za koje odredjeni podaci postaju invalidni ali i dalje upotrebljivi, sto znaci kad podaci postanu stale (zastareli) query
//ce ih prikazti ali uraditi refetch i onda proveriti sa novim podacima kad ih fetchuje da li su isti
//na primer ja sam gore stavio da stale postane za 10 minuta (inicijalno je 0 sekundi odnosno odmah ppstanu stale kako ih dobijes)
//to znaci da se nece triggerovati novi refetch u tih 10 min osim ako ti ne uradis refresh browsera recimo

//gcTime: to ti je vreme za koje se podaci brisu iz cache memorije sto znaci da ce kod nas to izgledati ovako
//prvih 10 minuta nece se triggerovati refetch, izmedju 10-15 minuta bice refetch ali ce se prikazati dataa iz cache-a
//nakon 15 min se nece prikazati nista adok se podaci ne fetch-uju ponovo

//kad ih definises globalno u clientu onda vaze za svaki query, ali zato svaki query pojedinacno moze ovo da pregazi

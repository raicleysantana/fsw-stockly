import { Skeleton } from "@/app/_components/ui/skeleton";

const MostSoldProductSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      {/* Título */}
      <div className="mb-9 h-6 w-40 rounded-sm bg-gray-300"></div>

      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            {/* Produto */}
            <div className="flex items-center justify-between">
              {/* Badge e Descrição */}
              <div className="space-y-2">
                {/* Badge */}
                <div className="h-6 w-20 rounded-full bg-gray-300"></div>

                {/* Nome do Produto */}
                <div className="h-4 w-32 rounded-md bg-gray-300"></div>

                {/* Preço */}
                <div className="h-4 w-16 rounded-md bg-gray-300"></div>
              </div>

              {/* Quantidade Vendida */}
              <div className="h-4 w-20 rounded-md bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </Skeleton>
  );
};

export default MostSoldProductSkeleton;

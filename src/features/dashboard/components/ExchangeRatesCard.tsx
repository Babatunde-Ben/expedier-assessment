import { ArrowRight, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EXCHANGE_RATES as rates } from "@/mocks/rates";

export function ExchangeRatesCard() {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <p className="text-base font-semibold text-black md:text-lg">
          Expedier rate
        </p>
        <Button
          type="button"
          variant="outline"
          className="size-10 border-border p-0 text-muted-foreground"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      <Table aria-label="Expedier exchange rates">
        <TableHeader>
          <TableHead>Currency</TableHead>
          <TableHead aria-hidden="true" />
          <TableHead>Rates</TableHead>
        </TableHeader>
        <TableBody>
          {rates.map(({ from, to }) => (
            <TableRow key={`${from}-${to}`} className="border-border">
              <TableCell className="text-base font-semibold text-black">
                {from}
              </TableCell>
              <TableCell className="min-w-24">
                <ArrowRight
                  className="mx-auto size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </TableCell>
              <TableCell className="text-base font-semibold text-black">
                {to}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

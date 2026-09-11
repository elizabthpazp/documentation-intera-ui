import { getDocsTocs } from "@/lib/markdown";
import TocObserver from "./toc-observer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TocHeading } from "./toc-heading";

export default async function Toc({ path, lang }: { path: string; lang?: string }) {
  const tocs = await getDocsTocs(path, lang ?? "es");

  return (
    <div className="lg:flex hidden toc flex-[1.5] min-w-[238px] py-9 sticky top-16 h-[96.95vh]">
      <div className="flex flex-col gap-3 w-full pl-2">
        <TocHeading />
        <ScrollArea className="pb-2 pt-0.5 overflow-y-auto">
          <TocObserver data={tocs} />
        </ScrollArea>
      </div>
    </div>
  );
}
